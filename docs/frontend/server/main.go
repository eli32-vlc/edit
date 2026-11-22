package main

// FMHY docs frontend API: labeled pages, rendered doc HTML, extracted site
// entries for the recommendation feed, and a text corpus for client-side
// semantic search.

import (
	"encoding/json"
	"fmt"
	"hash/fnv"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strconv"
	"strings"

	"github.com/gomarkdown/markdown"
	"github.com/gomarkdown/markdown/parser"
)

type Page struct {
	Slug   string `json:"slug"`
	Title  string `json:"title"`
	Label  string `json:"label"`
	Group  string `json:"group"`
	Stars  int    `json:"stars"`
	Links  int    `json:"links"`
}

type Site struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	URL      string `json:"url"`
	Desc     string `json:"desc"`
	Page     string `json:"page"`
	PageName string `json:"pageName"`
	Section  string `json:"section"`
	Starred  bool   `json:"starred"`
	Kind     string `json:"kind"`
}

type CorpusItem struct {
	ID   string `json:"id"`
	Kind string `json:"kind"`
	Text string `json:"text"`
	Ref  string `json:"ref"`
	Name string `json:"name"`
}

var (
	pages  []Page
	pageMD = map[string]string{}
	sites  []Site
	corpus []CorpusItem
)

var (
	reHeading  = regexp.MustCompile(`^#{1,4}\s+(.+?)\s*$`)
	reLink     = regexp.MustCompile(`\[([^\]]+)\]\((https?://[^)\s]+)\)`)
	reEmoji    = regexp.MustCompile("[\U0001F300-\U0001FAFF\u2600-\u27BF\u2B00-\u2BFF\uFE0F\u25B6-\u25FF]|◄+")
	reFMTitle  = regexp.MustCompile(`(?m)^title:\s*(.+?)\s*$`)
	reBoldLink = regexp.MustCompile(`\*\*\[([^\]]+)\]\((https?://[^)\s]+)\)\*\*`)
)

var groupOrder = []string{
	"beginners-guide", "index", "adblock-vpn-privacy", "privacy", "ai",
	"downloading", "torrenting", "educational", "reading", "gaming",
	"gaming-tools", "video", "video-tools", "audio", "image-tools",
	"file-tools", "internet-tools", "system-tools", "text-tools",
	"developer-tools", "linux-macos", "mobile", "social-media-tools",
	"storage", "non-english", "unsafe", "misc", "posts", "startpage",
	"sandbox", "feedback", "other",
}

func humanize(slug string) string {
	base := filepath.Base(slug)
	words := strings.Fields(strings.ReplaceAll(strings.ReplaceAll(base, "-", " "), "_", " "))
	for i, w := range words {
		if len(w) > 0 {
			words[i] = strings.ToUpper(w[:1]) + w[1:]
		}
	}
	return strings.Join(words, " ")
}

func cleanName(s string) string {
	s = reEmoji.ReplaceAllString(s, "")
	s = strings.TrimSpace(strings.Trim(s, "*_` "))
	return s
}

func docsRoot() string {
	if d := os.Getenv("DOCS_DIR"); d != "" {
		return d
	}
	return filepath.Join("..", "..")
}

func groupOf(slug string) string {
	if strings.Contains(slug, "/") {
		return "other"
	}
	return slug
}

func loadDocs() {
	root := docsRoot()
	var files []string
	filepath.Walk(root, func(p string, info os.FileInfo, err error) error {
		if err != nil || info.IsDir() {
			return nil
		}
		rel, _ := filepath.Rel(root, p)
		rel = filepath.ToSlash(rel)
		if !strings.HasSuffix(rel, ".md") {
			return nil
		}
		top := strings.SplitN(rel, "/", 2)[0]
		switch top {
		case "frontend", "public", ".vitepress", "node_modules":
			return nil
		}
		files = append(files, rel)
		return nil
	})
	sort.Strings(files)

	for _, rel := range files {
		raw, err := os.ReadFile(filepath.Join(root, filepath.FromSlash(rel)))
		if err != nil {
			continue
		}
		slug := strings.TrimSuffix(rel, ".md")
		text := string(raw)

		title := ""
		if m := reFMTitle.FindStringSubmatch(text); len(m) > 1 {
			title = m[1]
		}
		section := "General"
		stars, links := 0, 0
		for _, line := range strings.Split(text, "\n") {
			t := strings.TrimSpace(line)
			if m := reHeading.FindStringSubmatch(t); len(m) > 1 {
				h := cleanName(m[1])
				if title == "" {
					title = h
				}
				section = h
				continue
			}
			if strings.HasPrefix(t, "*") || strings.HasPrefix(t, "-") {
				if strings.Contains(t, "⭐") {
					stars++
				}
				links += len(reLink.FindAllString(t, -1))
				extractSites(t, slug, title, section)
			}
		}
		if title == "" {
			title = humanize(slug)
		}
		pageMD[slug] = text
		pages = append(pages, Page{
			Slug: slug, Title: title, Label: humanize(slug),
			Group: groupOf(slug), Stars: stars, Links: links,
		})
		corpus = append(corpus, CorpusItem{
			ID: "page:" + slug, Kind: "page", Ref: "/docs/" + slug,
			Name: title,
			Text: title + " — " + humanize(slug) + " guide covering " + section,
		})
	}
	sort.SliceStable(pages, func(i, j int) bool {
		iw, jw := len(groupOrder), len(groupOrder)
		for k, g := range groupOrder {
			if pages[i].Group == g {
				iw = k
			}
			if pages[j].Group == g {
				jw = k
			}
		}
		if iw != jw {
			return iw < jw
		}
		return pages[i].Slug < pages[j].Slug
	})
}

func internalURL(url string) bool {
	return strings.Contains(url, "reddit.com/r/FREEMEDIAHECKYEAH/wiki") ||
		strings.Contains(url, "github.com/fmhy/edit")
}

// Stable ID: wiki edits must not renumber sites, or saved feed state
// (likes/saves) would silently transfer to different entries.
func siteID(slug, url string) string {
	h := fnv.New64a()
	fmt.Fprintf(h, "%s|%s", slug, url)
	return "s" + strconv.FormatUint(h.Sum64(), 36)
}

func extractSites(line, slug, pageName, section string) {
	starred := strings.Contains(line, "⭐")
	kind := "site"
	if strings.Contains(line, "🌐") {
		kind = "index"
	}
	// Name: first bold-linked name that points outside the wiki itself, else
	// first external link. Lines like "* [X](url) - ... **[Site Warning](internal)**"
	// must resolve to X, not the trailing warning.
	var name, url string
	for _, m := range reBoldLink.FindAllStringSubmatch(line, -1) {
		if !internalURL(m[2]) {
			name, url = cleanName(m[1]), m[2]
			break
		}
	}
	if name == "" {
		for _, m := range reLink.FindAllStringSubmatch(line, -1) {
			if !internalURL(m[2]) {
				name, url = cleanName(m[1]), m[2]
				break
			}
		}
	}
	if name == "" || url == "" {
		return
	}
	// Description: text after the first " - " following the name link.
	desc := ""
	if idx := strings.Index(line, " - "); idx >= 0 {
		desc = line[idx+3:]
	}
	desc = reLink.ReplaceAllString(desc, "$1")
	desc = cleanName(desc)
	if len(desc) > 140 {
		desc = desc[:140]
	}
	if internalURL(url) {
		return // internal cross-references, not sites
	}
	s := Site{
		ID: siteID(slug, url), Name: name, URL: url, Desc: desc,
		Page: slug, PageName: pageName, Section: section,
		Starred: starred, Kind: kind,
	}
	sites = append(sites, s)
	if starred || kind == "index" {
		corpus = append(corpus, CorpusItem{
			ID: s.ID, Kind: "site", Ref: url, Name: name,
			Text: name + " — " + desc + " (" + pageName + ", " + section + ")",
		})
	}
}

func writeJSON(w http.ResponseWriter, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(v)
}

var reRootLink = regexp.MustCompile(`href="/([^/"][^"]*)"`)

func renderMD(src string) string {
	p := parser.NewWithExtensions(parser.CommonExtensions)
	html := string(markdown.ToHTML([]byte(src), p, nil))
	// Root-relative wiki links ("/gaming/#x") are served under /docs/ here.
	return reRootLink.ReplaceAllString(html, `href="/docs/$1"`)
}

func main() {
	loadDocs()
	log.Printf("loaded %d pages, %d sites, %d corpus items", len(pages), len(sites), len(corpus))

	mux := http.NewServeMux()
	mux.HandleFunc("/api/pages", func(w http.ResponseWriter, r *http.Request) { writeJSON(w, pages) })
	mux.HandleFunc("/api/page/", func(w http.ResponseWriter, r *http.Request) {
		slug := strings.TrimPrefix(r.URL.Path, "/api/page/")
		src, ok := pageMD[slug]
		if !ok {
			w.WriteHeader(http.StatusNotFound)
			writeJSON(w, map[string]string{"error": "page not found"})
			return
		}
		var p Page
		for _, pg := range pages {
			if pg.Slug == slug {
				p = pg
			}
		}
		writeJSON(w, map[string]any{
			"slug": p.Slug, "title": p.Title, "label": p.Label,
			"html": renderMD(src),
		})
	})
	mux.HandleFunc("/api/sites", func(w http.ResponseWriter, r *http.Request) { writeJSON(w, sites) })
	mux.HandleFunc("/api/search-index", func(w http.ResponseWriter, r *http.Request) { writeJSON(w, corpus) })
	mux.HandleFunc("/api/stats", func(w http.ResponseWriter, r *http.Request) {
		starred := 0
		for _, s := range sites {
			if s.Starred {
				starred++
			}
		}
		writeJSON(w, map[string]int{
			"pages": len(pages), "sites": len(sites), "starred": starred,
		})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("api listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, mux))
}

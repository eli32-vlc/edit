import type { DefaultTheme } from 'vitepress'
import { fileURLToPath } from 'node:url'
import consola from 'consola'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import OptimizeExclude from 'vite-plugin-optimize-exclude'
import { VitePWA } from 'vite-plugin-pwa'
import Terminal from 'vite-plugin-terminal'
import { defineConfig } from 'vitepress'
import {
  commitRef,
  feedback,
  meta,
  nav,
  search,
  sidebar,
  socialLinks
} from './constants'
import { generateFeed, generateImages, generateMeta } from './hooks'
import { hasLocale, t } from './i18n/node'
import { LOCALE, localizeItems, localizePath } from './i18n/shared'
import { defs, emojiRender, movePlugin } from './markdown/emoji'
import { headersPlugin } from './markdown/headers'
import { localLinksPlugin } from './markdown/localLinks'
import { toggleStarredPlugin } from './markdown/toggleStarred'
import { transformsPlugin } from './transformer'
import { replaceNoteLink } from './utils/markdown'

// @unocss-include

const baseUrl = process.env.GITHUB_ACTIONS ? '/edit' : '/'
const editPattern = 'https://github.com/fmhy/edit/edit/main/docs/:path'

const zhLocale = {
  label: '简体中文',
  lang: 'zh-CN',
  link: `/${LOCALE}/`,
  description: t(meta.description),
  themeConfig: {
    nav: localizeItems(nav, t),
    sidebar: localizeItems(sidebar as DefaultTheme.SidebarItem[], t),
    footer: {
      message: `<a href="${localizePath('/feedback')}" class="feedback-footer">${t('Made with ❤')}</a> (rev: ${commitRef})`,
      copyright:
        `© ${new Date().getFullYear()}, <a href="https://i.ibb.co/VJQmQ9t/image.png">${t('Estd 2018.')}</a>` +
        `<br/> ${t('This site does not host any files.')}`
    },
    editLink: {
      // Serialized to the client, so it cannot close over module variables.
      pattern: ({ filePath }: { filePath: string }) =>
        `https://github.com/fmhy/edit/edit/main/docs/${filePath.replace(/^zh\//, '')}`,
      text: t('Edit this page')
    },
    outline: { level: 'deep' as const, label: t('On this page') },
    docFooter: { prev: t('Previous page'), next: t('Next page') },
    darkModeSwitchLabel: t('Appearance'),
    lightModeSwitchTitle: t('Switch to light theme'),
    darkModeSwitchTitle: t('Switch to dark theme'),
    sidebarMenuLabel: t('Menu'),
    returnToTopLabel: t('Return to top'),
    langMenuLabel: t('Change language'),
    skipToContentLabel: t('Skip to content'),
    notFound: {
      title: t('PAGE NOT FOUND'),
      quote: t(
        "But if you don't change your direction, and if you keep looking, you may end up where you are heading."
      ),
      linkLabel: t('go to home'),
      linkText: t('Take me home')
    }
  }
}

const zhSearchTranslations = {
  button: { buttonText: t('Search'), buttonAriaLabel: t('Search') },
  modal: {
    displayDetails: t('Display detailed list'),
    resetButtonTitle: t('Reset search'),
    backButtonTitle: t('Close search'),
    noResultsText: t('No results for'),
    footer: {
      selectText: t('to select'),
      selectKeyAriaLabel: t('enter'),
      navigateText: t('to navigate'),
      navigateUpKeyAriaLabel: t('up arrow'),
      navigateDownKeyAriaLabel: t('down arrow'),
      closeText: t('to close'),
      closeKeyAriaLabel: t('escape')
    }
  }
}

export default defineConfig({
  title: 'FMHY',
  description: meta.description,
  titleTemplate: ':title • freemediaheckyeah',
  lang: 'en-US',
  lastUpdated: false,
  cleanUrls: true,
  appearance: true,
  base: baseUrl,
  locales: {
    root: { label: 'English', lang: 'en-US' },
    ...(hasLocale ? { [LOCALE]: zhLocale } : {})
  },
  scrollOffset: { selector: '.fmhy-scroll-inset', padding: 0 },
  srcExclude: ['README.md', 'public/single-page.md', 'single-page'],
  ignoreDeadLinks: true,
  sitemap: {
    hostname: meta.hostname
  },
  head: [
    ['meta', { name: 'theme-color', content: '#7bc5e4' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    // ['meta', { 'http-equiv': 'onion-location', content: 'http://fnp47tywqhwygfkkik3dkgreocdbevjslzs6fw4zbotomcbqeuyahjqd.onion' }],
    ['link', { rel: 'icon', href: '/fmhy.ico' }],
    [
      'link',
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'FMHY RSS Feed',
        href: '/feed.rss'
      }
    ],
    // PWA
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    [
      'link',
      { rel: 'alternate icon', href: '/pwa_icon.png', type: 'image/png' }
    ],
    ['meta', { name: 'keywords', content: meta.keywords.join(' ') }],
    [
      'link',
      { rel: 'apple-touch-icon', href: '/pwa_icon.png', sizes: '192x192' }
    ],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
    ],
    // Bing site verification
    [
      'meta',
      {
        name: 'msvalidate.01',
        content: 'F3028112EF6F929B562F4B18E58E3691'
      }
    ],
    // Google site verification
    [
      'meta',
      {
        name: 'google-site-verification',
        content: 'XCq-ZTw6VJPQ7gVNEOl8u0JRqfadK7WcsJ0H598Wv9E'
      }
    ],
    // Redirect to main site if embedded in iframe
    [
      'script',
      {},
      `
        (function() {
          if (window.self !== window.top) {
              window.top.location = window.location.href;
          }
        })();
        `
    ],
    // Apply the saved theme synchronously before the page paints, so users
    // who picked a non-default theme don't briefly see the default one.
    [
      'script',
      {},
      `
        (function() {
          try {
            var d = document.documentElement;
            var mode = localStorage.getItem('vitepress-display-mode');
            var amoled = localStorage.getItem('vitepress-amoled-enabled') === 'true';
            var themeName = localStorage.getItem('vitepress-theme-name') || (new Date().getMonth() === 9 ? 'halloween' : 'color-swarm');
            var varsJson = localStorage.getItem('vitepress-theme-vars');

            if (!mode) {
              mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }

            if (mode === 'dark') {
              d.classList.add('dark');
              d.classList.remove('light');
            } else {
              d.classList.add('light');
              d.classList.remove('dark');
            }

            if (mode === 'dark' && amoled) d.classList.add('amoled');
            else d.classList.remove('amoled');

            d.dataset.theme = themeName;

            if (varsJson) {
              var vars = JSON.parse(varsJson);
              for (var k in vars) {
                if (Object.prototype.hasOwnProperty.call(vars, k) && k.indexOf('--vp-') === 0) {
                  d.style.setProperty(k, vars[k]);
                }
              }
            }
          } catch (e) {}
        })();
        `
    ]
  ],
  transformHead: async (context) => generateMeta(context, meta.hostname),
  buildEnd: async (context) => {
    try {
      await generateImages(context)
      await generateFeed(context)
      consola.success('Build hooks completed successfully.')
    } catch (error) {
      consola.error('Build hook failed:', error)
      throw error
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },

    resolve: {
      alias: [
        {
          find: /^.*VPSwitchAppearance\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/ThemeDropdown.vue', import.meta.url)
          )
        },
        {
          find: /^.*VPLocalSearchBox\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPLocalSearchBox.vue', import.meta.url)
          )
        },
        {
          find: /^.*VPNav\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPNav.vue', import.meta.url)
          )
        },
        {
          find: /^.*VPSocialLink\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPSocialLink.vue', import.meta.url)
          )
        }
      ]
    },
    optimizeDeps: { exclude: ['workbox-window'] },
    plugins: [
      OptimizeExclude(),
      Terminal({
        console: 'terminal',
        output: ['console', 'terminal']
      }),
      UnoCSS({
        configFile: fileURLToPath(
          new URL('../../unocss.config.ts', import.meta.url)
        )
      }),
      AutoImport({
        dts: '../.cache/imports.d.ts',
        imports: ['vue', 'vitepress'],
        vueTemplate: true,
        biomelintrc: {
          enabled: true,
          filepath: './.cache/imports.json'
        }
      }),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          // Precache only the app shell; images and pages go through runtimeCaching below.
          maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
          globPatterns: ['**/*.{js,css,woff2}'],
          globIgnores: ['**/*localSearchIndex*.js'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 365 days
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: /\.(?:png|jpe?g|svg|webp|ico)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'images-cache',
                expiration: {
                  maxEntries: 60,
                  maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: ({ request }) => request.mode === 'navigate',
              handler: 'NetworkFirst',
              options: {
                cacheName: 'pages-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 // 1 day
                }
              }
            }
          ]
        },
        // Use docs/public/manifest.json (linked in head) instead of a generated one.
        manifest: false
      }),
      transformsPlugin(),
      {
        name: 'custom:adjust-order',
        configResolved(c) {
          movePlugin(
            c.plugins as any,
            'custom:transform-content',
            'before',
            'vitepress'
          )
        }
      }
    ],
    build: {
      reportCompressedSize: false,
      // Shut the fuck up
      chunkSizeWarningLimit: Number.POSITIVE_INFINITY
    }
  },
  markdown: {
    emoji: { defs },
    config(md) {
      md.use(emojiRender)
      md.use(toggleStarredPlugin)
      md.use(localLinksPlugin, baseUrl)
      meta.build.api && md.use(headersPlugin)
      replaceNoteLink(md)
    }
  },
  themeConfig: {
    search: hasLocale
      ? ({
          ...search,
          options: {
            ...search!.options,
            locales: { [LOCALE]: { translations: zhSearchTranslations } }
          }
        } as DefaultTheme.Config['search'])
      : search,
    footer: {
      message: `${feedback} (rev: ${commitRef})`,
      copyright:
        `© ${new Date().getFullYear()}, <a href="https://i.ibb.co/VJQmQ9t/image.png">Estd 2018.</a>` +
        `<br/> This site does not host any files.`
    },
    editLink: {
      pattern: editPattern,
      text: 'Edit this page'
    },
    outline: 'deep',
    logo: {
      src: '/fmhy.ico',
      alt: 'FMHY Logo'
    },
    nav,
    sidebar,
    socialLinks
  }
})

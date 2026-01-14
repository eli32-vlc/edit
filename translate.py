"""
Translate markdown docs to Chinese via OpenAI-compatible chat API.
- Skips frontmatter, fenced code blocks, and <script> blocks (passed through unchanged).
- Splits translatable text into independent chunks; each request has no prior context.
- Outputs translated files under translated/ with the same relative path as docs/.
"""
import os
import re
import json
import pathlib
import time
from typing import List, Tuple

import requests

SYSTEM_PROMPT = (
    "Help me to translate to chinese. Please note don't change project name. "
    "Please note don't leave any comments from you. Leave the format as is."
)
BASE_URL = os.environ["OPENAI_BASE_URL"].rstrip("/")
MODEL = os.environ["OPENAI_MODEL"]
API_KEY = os.environ["OPENAI_API_KEY"]
MAX_CHARS = int(os.environ.get("MAX_CHARS", "6000"))
SLEEP_SECONDS = float(os.environ.get("SLEEP_SECONDS", "1"))
REQUEST_TIMEOUT = int(os.environ.get("REQUEST_TIMEOUT", "60"))
DOCS_DIR = pathlib.Path(os.environ.get("DOCS_DIR", "docs"))
OUT_DIR = pathlib.Path(os.environ.get("OUT_DIR", "translated"))


def strip_think(text: str) -> str:
    return re.sub(r"<think>.*?</think>", "", text, flags=re.S)


def find_protected_spans(text: str) -> List[Tuple[int, int]]:
    spans: List[Tuple[int, int]] = []
    if text.startswith("---\n"):
        second = text.find("\n---\n", 4)
        if second != -1:
            spans.append((0, second + 5))
    for m in re.finditer(r"```[\s\S]*?```", text):
        spans.append((m.start(), m.end()))
    for m in re.finditer(r"<script[\s\S]*?</script>", text, flags=re.I):
        spans.append((m.start(), m.end()))
    spans.sort(key=lambda x: x[0])
    return spans


def split_segments(text: str) -> List[Tuple[str, str]]:
    spans = find_protected_spans(text)
    segments: List[Tuple[str, str]] = []
    last = 0
    for start, end in spans:
        if last < start:
            segments.append(("translate", text[last:start]))
        segments.append(("keep", text[start:end]))
        last = end
    if last < len(text):
        segments.append(("translate", text[last:]))
    return segments


def chunk_text(text: str, max_chars: int) -> List[str]:
    parts: List[str] = []
    start = 0
    length = len(text)
    while start < length:
        end = min(length, start + max_chars)
        cut = text.rfind("\n\n", start, end)
        if cut > start:
            end = cut
        parts.append(text[start:end])
        start = end
    return parts


def translate_chunk(chunk: str) -> str:
    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": chunk},
        ],
    }
    headers = {"Authorization": f"Bearer {API_KEY}"}
    print(f"Calling LLM with {len(chunk)} chars")
    resp = requests.post(
        f"{BASE_URL}/chat/completions",
        headers=headers,
        json=payload,
        timeout=REQUEST_TIMEOUT,
    )
    resp.raise_for_status()
    raw = resp.json()["choices"][0]["message"]["content"]
    print("LLM response received; stripping <think> block if present")
    return strip_think(raw)


def translate_translatable(text: str) -> str:
    chunks = chunk_text(text, MAX_CHARS)
    outputs: List[str] = []
    for idx, chunk in enumerate(chunks, start=1):
        print(f"Translating chunk {idx}/{len(chunks)} ({len(chunk)} chars)")
        outputs.append(translate_chunk(chunk))
        time.sleep(SLEEP_SECONDS)
    return "".join(outputs)


def translate_file(src_path: pathlib.Path, dst_path: pathlib.Path) -> None:
    content = src_path.read_text(encoding="utf-8")
    print(f"Processing file {src_path}")
    segments = split_segments(content)
    out_parts: List[str] = []
    for kind, text in segments:
        if kind == "keep":
            out_parts.append(text)
        else:
            out_parts.append(translate_translatable(text))
    dst_path.parent.mkdir(parents=True, exist_ok=True)
    dst_path.write_text("".join(out_parts), encoding="utf-8")
    print(f"Wrote translated file to {dst_path}")


def main() -> None:
    shard_index = int(os.environ.get("SHARD_INDEX", "0"))
    shard_total = int(os.environ.get("SHARD_TOTAL", "1"))
    files = sorted(DOCS_DIR.rglob("*.md"))
    targets = [f for i, f in enumerate(files) if i % shard_total == shard_index]
    if not targets:
        print("No files assigned to this shard.")
        return
    for path in targets:
        rel = path.relative_to(DOCS_DIR)
        out_path = OUT_DIR / rel
        print(f"Translating {path} -> {out_path}")
        translate_file(path, out_path)


if __name__ == "__main__":
    main()

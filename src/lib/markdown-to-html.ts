function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function parseInline(value: string) {
  let html = escapeHtml(value)
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>")
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>")
  return html.replace(/ {2}$/g, "<br />")
}

function parseTableRow(row: string) {
  return row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim())
}

function isTableDivider(row: string) {
  return /^\|?(\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?$/.test(row.trim())
}

function isTableRow(row: string) {
  return /^\|.*\|$/.test(row.trim())
}

function isTreeLine(row: string) {
  const trimmed = row.trim()
  return /^[│├└]/.test(trimmed) || /^([A-Za-z0-9_.-]+\/)$/.test(trimmed)
}

function renderTable(rows: string[]) {
  if (rows.length < 2 || !isTableDivider(rows[1])) return rows.map((row) => `<p>${parseInline(row)}</p>`).join("\n")

  const headers = parseTableRow(rows[0])
  const bodyRows = rows.slice(2).map(parseTableRow)

  const thead = `<thead><tr>${headers.map((header) => `<th>${parseInline(header)}</th>`).join("")}</tr></thead>`
  const tbody = `<tbody>${bodyRows
    .map((row) => `<tr>${row.map((cell) => `<td>${parseInline(cell)}</td>`).join("")}</tr>`)
    .join("")}</tbody>`

  return `<table>${thead}${tbody}</table>`
}

export function markdownToHtml(markdown: string) {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n")
  const htmlBlocks: string[] = []

  let paragraphBuffer: string[] = []
  let unorderedBuffer: string[] = []
  let orderedBuffer: string[] = []
  let blockquoteBuffer: string[] = []
  let tableBuffer: string[] = []
  let treeBuffer: string[] = []
  let inCodeBlock = false
  let codeLines: string[] = []
  let codeLanguage = ""

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) return
    const paragraph = paragraphBuffer.join(" ").trim()
    if (paragraph) htmlBlocks.push(`<p>${parseInline(paragraph)}</p>`)
    paragraphBuffer = []
  }

  const flushUnordered = () => {
    if (unorderedBuffer.length === 0) return
    const items = unorderedBuffer.map((item) => `<li>${parseInline(item)}</li>`).join("")
    htmlBlocks.push(`<ul>${items}</ul>`)
    unorderedBuffer = []
  }

  const flushOrdered = () => {
    if (orderedBuffer.length === 0) return
    const items = orderedBuffer.map((item) => `<li>${parseInline(item)}</li>`).join("")
    htmlBlocks.push(`<ol>${items}</ol>`)
    orderedBuffer = []
  }

  const flushBlockquote = () => {
    if (blockquoteBuffer.length === 0) return
    htmlBlocks.push(`<blockquote><p>${parseInline(blockquoteBuffer.join(" "))}</p></blockquote>`)
    blockquoteBuffer = []
  }

  const flushTable = () => {
    if (tableBuffer.length === 0) return
    htmlBlocks.push(renderTable(tableBuffer))
    tableBuffer = []
  }

  const flushCodeBlock = () => {
    if (codeLines.length === 0) return
    const languageClass = codeLanguage ? ` class="language-${escapeHtml(codeLanguage)}"` : ""
    htmlBlocks.push(`<pre><code${languageClass}>${escapeHtml(codeLines.join("\n"))}</code></pre>`)
    codeLines = []
    codeLanguage = ""
  }

  const flushTree = () => {
    if (treeBuffer.length === 0) return
    htmlBlocks.push(`<pre><code>${escapeHtml(treeBuffer.join("\n"))}</code></pre>`)
    treeBuffer = []
  }

  const flushAll = () => {
    flushParagraph()
    flushUnordered()
    flushOrdered()
    flushBlockquote()
    flushTable()
    flushTree()
  }

  const findNextNonEmpty = (startIndex: number) => {
    for (let index = startIndex; index < lines.length; index += 1) {
      const value = lines[index].trim()
      if (value) return value
    }
    return ""
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const trimmed = line.trim()

    if (trimmed.startsWith("```")) {
      if (inCodeBlock) {
        flushCodeBlock()
        inCodeBlock = false
      } else {
        const nextNonEmpty = findNextNonEmpty(index + 1)
        if (!trimmed.slice(3).trim() && /^#{1,6}\s+/.test(nextNonEmpty)) continue
        flushAll()
        inCodeBlock = true
        codeLanguage = trimmed.slice(3).trim()
      }
      continue
    }

    if (inCodeBlock) {
      codeLines.push(line)
      continue
    }

    if (isTableRow(trimmed)) {
      flushParagraph()
      flushUnordered()
      flushOrdered()
      flushBlockquote()
      flushTree()
      tableBuffer.push(trimmed)
      continue
    }

    if (tableBuffer.length > 0) {
      flushTable()
    }

    if (isTreeLine(line)) {
      flushParagraph()
      flushUnordered()
      flushOrdered()
      flushBlockquote()
      treeBuffer.push(line)
      continue
    }

    if (treeBuffer.length > 0) {
      flushTree()
    }

    if (trimmed.length === 0) {
      flushAll()
      continue
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.+)$/)
    if (heading) {
      flushAll()
      const level = heading[1].length
      htmlBlocks.push(`<h${level}>${parseInline(heading[2])}</h${level}>`)
      continue
    }

    if (/^---+$/.test(trimmed)) {
      flushAll()
      htmlBlocks.push("<hr />")
      continue
    }

    const unordered = trimmed.match(/^[-*]\s+(.+)$/)
    if (unordered) {
      flushParagraph()
      flushOrdered()
      flushBlockquote()
      unorderedBuffer.push(unordered[1])
      continue
    }

    const ordered = trimmed.match(/^\d+\.\s+(.+)$/)
    if (ordered) {
      flushParagraph()
      flushUnordered()
      flushBlockquote()
      orderedBuffer.push(ordered[1])
      continue
    }

    const blockquote = trimmed.match(/^>\s?(.+)$/)
    if (blockquote) {
      flushParagraph()
      flushUnordered()
      flushOrdered()
      blockquoteBuffer.push(blockquote[1])
      continue
    }

    flushUnordered()
    flushOrdered()
    flushBlockquote()
    paragraphBuffer.push(trimmed)
  }

  if (inCodeBlock) {
    flushCodeBlock()
  }

  flushAll()
  return htmlBlocks.join("\n")
}

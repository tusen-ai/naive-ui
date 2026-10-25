// The docs Markdown embeds a few site components (`<n-alert>`, `<n-text code>`
// and the like). For the Markdown served to LLMs, the known ones become their
// Markdown equivalent and any other tag is dropped, keeping its text. Code
// blocks and code spans are left as they are.

const CODE_SPAN = /(`+)[\s\S]*?\1/g
const PLACEHOLDER = /\0(\d+)\0/g

function decodeEntities(text: string): string {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
}

function getAttr(attrs: string, name: string): string | undefined {
  return new RegExp(`(?:^|\\s)${name}="([^"]*)"`).exec(attrs)?.[1]
}

function collapse(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

// Inline conversions, valid anywhere in prose
function convertInline(text: string): string {
  return (
    text
      // <n-text code>foo</n-text> -> `foo`
      .replace(
        /<n-text\s+code\s*>([\s\S]*?)<\/n-text>/g,
        (_, code: string) => `\`${decodeEntities(code.trim())}\``
      )
      // An element that links somewhere -> [text](href); innermost first
      .replace(
        /<(a|n-a|n-button|router-link)\b([^>]*)>((?:(?!<\1\b)[\s\S])*?)<\/\1>/g,
        (match, _tag: string, attrs: string, inner: string) => {
          const href = getAttr(attrs, 'href') ?? getAttr(attrs, 'to')
          const label = collapse(stripTags(inner))
          return href && label ? `[${label}](${href})` : label || match
        }
      )
      .replace(/<img\b([^>]*?)\/?>/g, (_, attrs: string) => {
        const src = getAttr(attrs, 'src')
        return src ? `![${getAttr(attrs, 'alt') ?? ''}](${src})` : ''
      })
  )
}

function stripTags(text: string): string {
  return text.replace(
    /<\/?(?:n-[\w-]+|template|router-link|br|[A-Z]\w*)\b[^>]*>/g,
    ''
  )
}

// Lines of a block of site components -> Markdown
function convertBlock(block: string): string {
  const converted = convertInline(block)
    .replace(
      /<n-alert\b([^>]*)>([\s\S]*?)<\/n-alert>/g,
      (_, attrs: string, body: string) => {
        const title = getAttr(attrs, 'title')
        const lines = convertBlock(body).split('\n')
        if (title)
          lines.unshift(`**${title}**`, '')
        return `\n\n${lines.map(line => (line ? `> ${line}` : '>')).join('\n')}\n\n`
      }
    )
    .replace(/<li>([\s\S]*?)<\/li>/g, (_, item: string) => {
      return `\n- ${collapse(stripTags(item))}\n`
    })
  return (
    stripTags(converted)
      .split('\n')
      .map(line => line.trim())
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      // Keep the items of a list together
      .replace(/(?<=^- [^\n]*)\n\n(?=- )/gm, '\n')
      .trim()
  )
}

// A block starts with a site component at the start of a line and ends with
// its closing tag at the start of a line
const BLOCK = /^<(n-[\w-]+)\b[\s\S]*?^<\/\1>[ \t]*$/gm

function convertProse(text: string): string {
  const spans: string[] = []
  const protectedText = text.replace(CODE_SPAN, (span) => {
    spans.push(span)
    return `\0${spans.length - 1}\0`
  })
  const converted = convertInline(
    protectedText.replace(BLOCK, block => convertBlock(block))
  )
    // A tag alone on its line whose block a code block split in two
    .replace(/^[ \t]*<\/?n-[\w-]+\b[^>]*>[ \t]*(?:\n|$(?![\s\S]))/gm, '')
  return converted.replace(PLACEHOLDER, (_, i: string) => spans[Number(i)])
}

const FENCE = /^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1[ \t]*$/gm

/** Applies `fn` to the Markdown outside fenced code blocks. */
export function mapProse(
  markdown: string,
  fn: (prose: string) => string
): string {
  let result = ''
  let last = 0
  for (const match of markdown.matchAll(FENCE)) {
    result += fn(markdown.slice(last, match.index)) + match[0]
    last = match.index + match[0].length
  }
  return result + fn(markdown.slice(last))
}

/** Converts the site components in a docs Markdown file to plain Markdown. */
export function naiveHtmlToMarkdown(markdown: string): string {
  return mapProse(markdown, convertProse).replace(/\n{3,}/g, '\n\n')
}

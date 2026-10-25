import type { Token, TokenizerExtension, Tokens } from 'marked'
import type { Category, Locale, PageEntry } from './site'
import fs from 'node:fs/promises'
import path from 'node:path'
import { parse as parseSfc } from '@vue/compiler-sfc'
import { Marked } from 'marked'
import {
  getPageEntries,
  getPageRoute,
  getPageSource,
  locales,
  SITE_ORIGIN
} from './site'
import { templateToMarkdown } from './template-to-markdown'

// Builds the Markdown of a docs page from its sources: the page's Markdown,
// with its demos written out and the site-only parts made plain Markdown

export interface Page extends PageEntry {
  route: string
  title: string
  /** First paragraph of the page, on one line */
  description: string
  markdown: string
}

/**
 * A site component written inline in prose, e.g. `<n-text code>foo</n-text>`
 * or `<n-a href="...">bar</n-a>`, as one token.
 */
const siteElement: TokenizerExtension = {
  name: 'siteElement',
  level: 'inline',
  start: src => src.search(/<(?:n-|router-link)/),
  tokenizer(src) {
    const match = /^<(n-[\w-]+|router-link)\b[^>]*>[\s\S]*?<\/\1>/.exec(src)
    if (match)
      return { type: 'siteElement', raw: match[0] }
  }
}

const marked = new Marked({ extensions: [siteElement] })

/** A code block whose fence is longer than any run of backticks in the code. */
export function fence(code: string, lang: string): string {
  const runs = code.match(/`+/g) ?? []
  const marks = '`'.repeat(Math.max(3, ...runs.map(run => run.length + 1)))
  return `${marks}${lang}\n${code}\n${marks}`
}

const categories: Category[] = ['docs', 'components']

function isPagePath(pathname: string): boolean {
  const [, locale, category, slug, ...rest] = pathname.split('/')
  return (
    locales.includes(locale as Locale)
    && categories.includes(category as Category)
    && !!slug
    && !slug.includes('.')
    && rest.length === 0
  )
}

/**
 * Makes a link absolute, so it still works in llms.txt and llms-full.txt. A
 * link to a docs page points to its Markdown version.
 */
export function resolveHref(href: string, route: string): string {
  // An anchor, or already absolute (`https:`, `mailto:`, ...)
  if (href.startsWith('#') || URL.canParse(href))
    return href
  const url = new URL(href, `${SITE_ORIGIN}${route}`)
  if (isPagePath(url.pathname))
    url.pathname += '.md'
  return url.href
}

function replaceLast(
  text: string,
  search: string,
  replacement: string
): string {
  const index = text.lastIndexOf(search)
  return text.slice(0, index) + replacement + text.slice(index + search.length)
}

type Replacement = [from: string, to: string]

/** Replaces each `from` after the previous one, in document order. */
function replaceInOrder(text: string, replacements: Replacement[]): string {
  let result = ''
  let rest = text
  for (const [from, to] of replacements) {
    const index = rest.indexOf(from)
    result += rest.slice(0, index) + to
    rest = rest.slice(index + from.length)
  }
  return result + rest
}

/** Rewrites the inline tokens of `markdown` that `rewrite` returns a new raw for. */
function rewriteInline(
  markdown: string,
  rewrite: (token: Token) => string | undefined
): string {
  const replacements: Replacement[] = []
  marked.walkTokens(marked.lexer(markdown), (token) => {
    const raw = rewrite(token)
    if (raw !== undefined && raw !== token.raw)
      replacements.push([token.raw, raw])
  })
  return replaceInOrder(markdown, replacements)
}

function resolveLinks(markdown: string, route: string): string {
  return rewriteInline(markdown, (token) => {
    if (token.type !== 'link')
      return undefined
    const { raw, href } = token as Tokens.Link
    return replaceLast(raw, href, resolveHref(href, route))
  })
}

function renderSiteElements(markdown: string): string {
  return rewriteInline(markdown, token =>
    token.type === 'siteElement' ? templateToMarkdown(token.raw) : undefined)
}

/** A demo: its title, its description and its full source. */
export function renderDemo(source: string, route: string): string {
  const { descriptor } = parseSfc(source)
  const doc = descriptor.customBlocks.find(block => block.type === 'markdown')
  const code = doc
    ? source.replace(`<markdown>${doc.content}</markdown>`, '')
    : source
  const [heading, ...body] = marked
    .lexer(doc?.content ?? '')
    .filter(token => token.type !== 'space')
  const title = heading?.type === 'heading' ? heading.text : ''
  return [
    `### ${title}`,
    ...body.map(token => renderBlock(token, route)),
    fence(code.trim(), 'vue')
  ]
    .filter(Boolean)
    .join('\n\n')
}

async function renderDemos(
  list: string,
  dir: string,
  route: string
): Promise<string> {
  const ids = list
    .split('\n')
    .map(id => id.trim())
    // Debug demos are left out of the production site too
    .filter(id => id && !id.toLowerCase().includes('debug'))
  const demos = await Promise.all(
    ids.map(async (id) => {
      const isVue = id.endsWith('.vue')
      const file = isVue
        ? `${path.basename(id, '.vue')}.demo.vue`
        : `${id}.demo.md`
      const source = await fs.readFile(path.join(dir, file), 'utf-8')
      return isVue ? renderDemo(source, route) : source.trim()
    })
  )
  return demos.join('\n\n')
}

/** A block of the page as plain Markdown, with absolute links. */
function renderBlock(token: Token, route: string): string {
  if (token.type === 'space')
    return ''
  if (token.type === 'html' && token.raw.trimStart().startsWith('<!--'))
    return ''
  const markdown
    = token.type === 'html'
      ? templateToMarkdown(token.raw)
      : renderSiteElements(token.raw)
  return resolveLinks(markdown, route).trim()
}

/** Renders the Markdown of a page from its sources. */
export async function renderPage(
  root: string,
  entry: PageEntry
): Promise<Page> {
  const route = getPageRoute(entry)
  const file = await getPageSource(root, entry)
  const tokens = marked.lexer(await fs.readFile(file, 'utf-8'))
  const blocks: string[] = []
  let title = entry.label
  let description = ''
  for (const token of tokens) {
    if (token.type === 'code' && token.lang === 'demo') {
      blocks.push(await renderDemos(token.text, path.dirname(file), route))
      continue
    }
    // The imports of components embedded in the page are for the site only
    if (token.type === 'code' && token.lang === 'component')
      continue
    const block = renderBlock(token, route)
    if (token.type === 'heading' && token.depth === 1 && !blocks.length)
      title = token.text
    else if (token.type === 'paragraph' && !description)
      description = block.split(/\s+/).join(' ')
    if (block)
      blocks.push(block)
  }
  return {
    ...entry,
    route,
    title,
    description,
    markdown: `${blocks.join('\n\n')}\n`
  }
}

export async function renderPages(
  root: string,
  locale: Locale
): Promise<Page[]> {
  return Promise.all(
    getPageEntries(locale).map(entry => renderPage(root, entry))
  )
}

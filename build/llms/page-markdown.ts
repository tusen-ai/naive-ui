import type { Nodes, RootContent } from 'mdast'
import type { Category, Locale, PageEntry } from './site'
import fs from 'node:fs/promises'
import path from 'node:path'
import { parse as parseSfc } from '@vue/compiler-sfc'
import { visit } from 'unist-util-visit'
import { getSource, getText, isHeading, parseMarkdown } from '../utils/markdown'
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

/** A part of a text, from `start` to `end`, to replace by `value`. */
interface Replacement {
  start: number
  end: number
  value: string
}

function applyReplacements(text: string, replacements: Replacement[]): string {
  let result = ''
  let last = 0
  for (const { start, end, value } of replacements) {
    // A replacement inside a replaced part is already done
    if (start < last)
      continue
    result += text.slice(last, start) + value
    last = end
  }
  return result + text.slice(last)
}

function getOffsets(node: Nodes): [start: number, end: number] {
  return [node.position!.start.offset!, node.position!.end.offset!]
}

/**
 * Points the links of `markdown` at the Markdown versions of their pages.
 * `tree` is `markdown` already parsed, `base` the offset its positions start
 * from; without them the text is parsed here.
 */
function resolveLinks(
  markdown: string,
  route: string,
  tree: Nodes = parseMarkdown(markdown),
  base = 0
): string {
  const replacements: Replacement[] = []
  visit(tree, 'link', (link) => {
    const [start, end] = getOffsets(link).map(offset => offset - base)
    const raw = markdown.slice(start, end)
    // The destination is the last occurrence of the url in the link
    const index = raw.lastIndexOf(link.url)
    const href = resolveHref(link.url, route)
    if (index === -1 || href === link.url)
      return
    replacements.push({
      start: start + index,
      end: start + index + link.url.length,
      value: href
    })
  })
  return applyReplacements(markdown, replacements)
}

/** The tag of the site component an inline HTML node opens, e.g. `n-text`. */
function getOpenedSiteElement(node: Nodes): string | undefined {
  if (node.type !== 'html' || node.value.endsWith('/>'))
    return undefined
  return /^<(n-[\w-]+|router-link)\b[^>]*>$/.exec(node.value)?.[1]
}

/**
 * Site components written inline in prose, e.g. `<n-text code>foo</n-text>`
 * or `<n-a href="...">bar</n-a>`, turned into Markdown. In the tree each is
 * its opening tag, its content and its closing tag, side by side.
 */
function renderSiteElements(block: Nodes, markdown: string): string {
  const [base] = getOffsets(block)
  const replacements: Replacement[] = []
  visit(block, (node, index, parent) => {
    const tag = getOpenedSiteElement(node)
    if (!tag || !parent || index === undefined)
      return
    const close = parent.children
      .slice(index + 1)
      .find(
        sibling => sibling.type === 'html' && sibling.value === `</${tag}>`
      )
    if (!close)
      return
    const start = getOffsets(node)[0] - base
    const end = getOffsets(close)[1] - base
    replacements.push({
      start,
      end,
      value: templateToMarkdown(markdown.slice(start, end))
    })
  })
  return applyReplacements(markdown, replacements)
}

/** A demo: its title, its description and its full source. */
export function renderDemo(source: string, route: string): string {
  const { descriptor } = parseSfc(source)
  const doc = descriptor.customBlocks.find(block => block.type === 'markdown')
  const code = doc
    ? source.replace(`<markdown>${doc.content}</markdown>`, '')
    : source
  const text = doc?.content ?? ''
  const [heading, ...body] = parseMarkdown(text).children
  return [
    `### ${heading?.type === 'heading' ? getText(heading) : ''}`,
    ...body.map(node => renderBlock(node, text, route)),
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
function renderBlock(node: RootContent, text: string, route: string): string {
  const source = getSource(node, text)
  if (node.type === 'html' && source.startsWith('<!--'))
    return ''
  const markdown
    = node.type === 'html'
      ? templateToMarkdown(source)
      : renderSiteElements(node, source)
  // Unchanged, the block's own tree has its links: no need to parse it again
  return (
    markdown === source
      ? resolveLinks(markdown, route, node, getOffsets(node)[0])
      : resolveLinks(markdown, route)
  ).trim()
}

/** Renders the Markdown of a page from its sources. */
export async function renderPage(
  root: string,
  entry: PageEntry
): Promise<Page> {
  const route = getPageRoute(entry)
  const file = await getPageSource(root, entry)
  const text = await fs.readFile(file, 'utf-8')
  const blocks: string[] = []
  let title = entry.label
  let description = ''
  for (const node of parseMarkdown(text).children) {
    if (node.type === 'code' && node.lang === 'demo') {
      blocks.push(await renderDemos(node.value, path.dirname(file), route))
      continue
    }
    // The page's settings and the imports of the components embedded in the
    // page are for the site only
    if (
      node.type === 'yaml'
      || (node.type === 'code' && node.lang === 'component')
    ) {
      continue
    }
    const block = renderBlock(node, text, route)
    if (isHeading(node, 1) && !blocks.length)
      title = getText(node)
    else if (node.type === 'paragraph' && !description)
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

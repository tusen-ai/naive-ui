import fs from 'node:fs/promises'
import path from 'node:path'
import { componentMenuItems, docMenuItems } from '../../demo/store/menu-data'
import { mapProse, naiveHtmlToMarkdown } from './naive-html'

export const SITE_ORIGIN = 'https://www.naiveui.com'

export type Locale = 'en-US' | 'zh-CN'
export type Category = 'docs' | 'components'

export const locales: Locale[] = ['en-US', 'zh-CN']

const localeDirs: Record<Locale, string> = { 'en-US': 'enUS', 'zh-CN': 'zhCN' }

interface MenuItem {
  en: string
  zh: string
  path?: string
  children?: MenuItem[]
}

export interface PageEntry {
  locale: Locale
  category: Category
  /** Route segment after the category, e.g. `button` */
  slug: string
  /** Menu group the page belongs to, e.g. `Common Components` */
  group: string
  /** Menu label, e.g. `Button` or `按钮` */
  label: string
}

export interface Page extends PageEntry {
  /** Site path of the page, e.g. `/en-US/components/button` */
  route: string
  title: string
  /** First paragraph of the page, on one line */
  description: string
  markdown: string
}

/** Every page of the site menu for a locale, in menu order. */
export function getPageEntries(locale: Locale): PageEntry[] {
  const key = locale === 'zh-CN' ? 'zh' : 'en'
  const entries: PageEntry[] = []
  const menus: [Category, MenuItem[]][] = [
    ['docs', docMenuItems],
    ['components', componentMenuItems]
  ]
  for (const [category, groups] of menus) {
    for (const group of groups) {
      for (const item of group.children ?? []) {
        if (!item.path)
          continue
        entries.push({
          locale,
          category,
          slug: item.path.replace(/^\//, ''),
          group: group[key],
          label: item[key]
        })
      }
    }
  }
  return entries
}

export function getPageRoute({ locale, category, slug }: PageEntry): string {
  return `/${locale}/${category}/${slug}`
}

/** The Markdown file a page is built from. */
async function resolveSource(
  root: string,
  { locale, category, slug }: PageEntry
): Promise<string> {
  if (slug === 'changelog')
    return path.resolve(root, `CHANGELOG.${locale}.md`)
  const dir
    = category === 'components'
      ? path.resolve(root, 'src', slug, 'demos', localeDirs[locale])
      : path.resolve(root, 'demo/pages/docs', slug, localeDirs[locale])
  for (const name of ['index.demo-entry.md', 'index.md']) {
    const file = path.join(dir, name)
    if (await exists(file))
      return file
  }
  throw new Error(
    `[llms] No Markdown source for ${getPageRoute({ locale, category, slug } as PageEntry)} in ${dir}`
  )
}

async function exists(file: string): Promise<boolean> {
  try {
    await fs.access(file)
    return true
  }
  catch {
    return false
  }
}

/** A code block whose fence is longer than any backtick run in the code. */
export function fence(code: string, lang: string): string {
  const longest = Math.max(
    2,
    ...(code.match(/`+/g) ?? []).map(run => run.length)
  )
  const marks = '`'.repeat(longest + 1)
  return `${marks}${lang}\n${code}\n${marks}`
}

/**
 * A demo as Markdown: its title, its description and its full source.
 * `.demo.vue` files keep the description in a `<markdown>` block.
 */
export function renderDemo(source: string, headingLevel = 3): string {
  const match = /<markdown>([\s\S]*?)<\/markdown>/.exec(source)
  const doc = (match?.[1] ?? '').trim()
  const code = source.replace(/<markdown>[\s\S]*?<\/markdown>/, '').trim()
  const [, title = '', description = '']
    = /^#\s+([^\n]+)\n?([\s\S]*)$/.exec(doc) ?? []
  const parts = [`${'#'.repeat(headingLevel)} ${title.trim()}`]
  if (description.trim())
    parts.push(naiveHtmlToMarkdown(description.trim()))
  parts.push(fence(code, 'vue'))
  return parts.join('\n\n')
}

async function renderDemos(block: string, dir: string): Promise<string> {
  const ids = block
    .split('\n')
    .map(id => id.trim())
    // Debug demos are left out of the production site too
    .filter(id => id && !/debug/i.test(id))
  const demos = await Promise.all(
    ids.map(async (id) => {
      const file = id.endsWith('.vue')
        ? `${id.slice(0, -'.vue'.length)}.demo.vue`
        : `${id}.demo.md`
      const source = await fs.readFile(path.join(dir, file), 'utf-8')
      return file.endsWith('.vue') ? renderDemo(source) : source.trim()
    })
  )
  return demos.join('\n\n')
}

/**
 * Makes the links of a page absolute, so they still work in llms.txt and
 * llms-full.txt. A link to another docs page points to its Markdown version.
 */
export function resolveLinks(markdown: string, route: string): string {
  const base = new URL(route, SITE_ORIGIN)
  return mapProse(markdown, prose =>
    prose.replace(
      /(\]\()([^)\s]+)(\))/g,
      (match, open: string, target: string, close: string) => {
        if (/^(?:[a-z][\w+.-]*:|#)/i.test(target))
          return match
        const url = new URL(target, base)
        if (url.origin !== SITE_ORIGIN)
          return match
        if (
          /^\/(?:en-US|zh-CN)\/(?:docs|components)\/[^/.]+$/.test(url.pathname)
        )
          url.pathname += '.md'
        return `${open}${url.href}${close}`
      }
    ))
}

/** First paragraph after the title, on one line, for llms.txt. */
export function getDescription(markdown: string): string {
  const body = markdown.replace(/^[\s\S]*?^#\s[^\n]*\n/m, '')
  for (const block of body.split(/\n\s*\n/)) {
    const text = block.trim()
    if (!text || /^(?:#|```|\||>|<|-|\d+\.)/.test(text))
      continue
    return text.replace(/\s+/g, ' ')
  }
  return ''
}

/** Renders the Markdown of one page from its sources. */
export async function renderPage(
  root: string,
  entry: PageEntry
): Promise<Page> {
  const file = await resolveSource(root, entry)
  let markdown = await fs.readFile(file, 'utf-8')
  const demoBlock = /^```demo\n([\s\S]*?)^```[ \t]*$/m.exec(markdown)
  if (demoBlock) {
    const demos = await renderDemos(demoBlock[1], path.dirname(file))
    markdown = markdown.replace(demoBlock[0], () => demos)
  }
  markdown = naiveHtmlToMarkdown(
    markdown
      // Site-only parts: imports for embedded components, layout switches
      .replace(/^```component\n[\s\S]*?^```[ \t]*\n?/m, '')
      .replace(/<!--[\s\S]*?-->/g, '')
  ).trim()
  markdown = resolveLinks(markdown, getPageRoute(entry))
  const title = /^#\s+(.+)$/m.exec(markdown)?.[1].trim() ?? entry.label
  return {
    ...entry,
    route: getPageRoute(entry),
    title,
    description: getDescription(markdown),
    markdown: `${markdown}\n`
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

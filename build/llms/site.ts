import type { MenuItem } from '../../demo/store/menu-data'
import fs from 'node:fs/promises'
import path from 'node:path'
import { componentMenuItems, docMenuItems } from '../../demo/store/menu-data'

// The pages of the docs site, as its menu lists them, and their sources

export const SITE_ORIGIN = 'https://www.naiveui.com'

export type Locale = 'en-US' | 'zh-CN'
export type Category = 'docs' | 'components'

export const locales: Locale[] = ['en-US', 'zh-CN']

const sourceDirNames: Record<Locale, string> = {
  'en-US': 'enUS',
  'zh-CN': 'zhCN'
}

export interface PageEntry {
  locale: Locale
  category: Category
  /** Route segment after the category, e.g. `button` */
  slug: string
  /** Menu group the page is in, e.g. `Common Components` */
  group: string
  /** Menu label, e.g. `Button` or `按钮` */
  label: string
}

function getMenuLabel(item: MenuItem, locale: Locale): string {
  return locale === 'zh-CN' ? item.zh : item.en
}

function getGroupEntries(
  group: MenuItem,
  category: Category,
  locale: Locale
): PageEntry[] {
  const items = (group.children ?? []).filter(item => item.path)
  return items.map(item => ({
    locale,
    category,
    slug: item.path!.slice(1),
    group: getMenuLabel(group, locale),
    label: getMenuLabel(item, locale)
  }))
}

/** Every page in the site menu for a locale, in menu order. */
export function getPageEntries(locale: Locale): PageEntry[] {
  return [
    ...docMenuItems.flatMap(group => getGroupEntries(group, 'docs', locale)),
    ...componentMenuItems.flatMap(group =>
      getGroupEntries(group, 'components', locale)
    )
  ]
}

/** Site path of a page, e.g. `/en-US/components/button`. */
export function getPageRoute({ locale, category, slug }: PageEntry): string {
  return `/${locale}/${category}/${slug}`
}

async function isFile(file: string): Promise<boolean> {
  return fs.stat(file).then(
    stat => stat.isFile(),
    () => false
  )
}

/** The Markdown file a page is built from. */
export async function getPageSource(
  root: string,
  entry: PageEntry
): Promise<string> {
  const { locale, category, slug } = entry
  if (slug === 'changelog')
    return path.join(root, `CHANGELOG.${locale}.md`)
  const dir
    = category === 'components'
      ? path.join(root, 'src', slug, 'demos', sourceDirNames[locale])
      : path.join(root, 'demo/pages/docs', slug, sourceDirNames[locale])
  for (const name of ['index.demo-entry.md', 'index.md']) {
    const file = path.join(dir, name)
    if (await isFile(file))
      return file
  }
  throw new Error(`[llms] No Markdown source for ${getPageRoute(entry)}`)
}

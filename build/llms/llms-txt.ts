import type { Page } from './page-markdown'
import type { Locale } from './site'
import { SITE_ORIGIN } from './site'

// Pages listed under `## Optional`: llms.txt's section for what a reader with
// little context to spare can skip
const OPTIONAL_SLUGS = new Set(['changelog'])

const texts: Record<
  Locale,
  { summary: string, intro: (otherIndex: string) => string, optional: string }
> = {
  'en-US': {
    summary:
      'A Vue 3 component library. Fairly complete, theme customizable, uses TypeScript, fast.',
    intro: other =>
      `Each link below is the Markdown version of a page of the docs site (${SITE_ORIGIN}). Component pages include the API and the full source of every demo. All pages in one file: ${SITE_ORIGIN}/llms-full.txt. In Chinese: ${other}.`,
    optional: 'Optional'
  },
  'zh-CN': {
    summary: '一个 Vue 3 组件库。比较完整，主题可调，使用 TypeScript，快。',
    intro: other =>
      `下面每个链接都是文档站（${SITE_ORIGIN}）一个页面的 Markdown 版本。组件页包含 API 和每个示例的完整源码。所有页面合在一个文件里：${SITE_ORIGIN}/zh-CN/llms-full.txt。English: ${other}.`,
    optional: 'Optional'
  }
}

/** Where a locale's llms.txt lives: English at the root, others under the locale. */
export function getLlmsPath(
  locale: Locale,
  name: 'llms.txt' | 'llms-full.txt'
): string {
  return locale === 'en-US' ? `/${name}` : `/${locale}/${name}`
}

export function getMarkdownUrl(page: Page): string {
  return `${SITE_ORIGIN}${page.route}.md`
}

/** The llms.txt index (https://llmstxt.org): pages grouped as in the site menu. */
export function renderLlmsTxt(locale: Locale, pages: Page[]): string {
  const t = texts[locale]
  const other = locale === 'en-US' ? 'zh-CN' : 'en-US'
  const lines = [
    '# Naive UI',
    '',
    `> ${t.summary}`,
    '',
    t.intro(`${SITE_ORIGIN}${getLlmsPath(other, 'llms.txt')}`)
  ]
  const sections = new Map<string, Page[]>()
  for (const page of pages) {
    const section = OPTIONAL_SLUGS.has(page.slug) ? t.optional : page.group
    sections.set(section, [...(sections.get(section) ?? []), page])
  }
  // Optional comes last, as the spec expects
  const ordered = [...sections].sort(
    ([a], [b]) => Number(a === t.optional) - Number(b === t.optional)
  )
  for (const [section, sectionPages] of ordered) {
    lines.push('', `## ${section}`, '')
    for (const page of sectionPages) {
      const link = `- [${page.title}](${getMarkdownUrl(page)})`
      lines.push(page.description ? `${link}: ${page.description}` : link)
    }
  }
  return `${lines.join('\n')}\n`
}

/** Every page in one file, except the optional ones. */
export function renderLlmsFullTxt(pages: Page[]): string {
  return `${pages
    .filter(page => !OPTIONAL_SLUGS.has(page.slug))
    .map(
      page =>
        `<!-- Source: ${getMarkdownUrl(page)} -->\n\n${page.markdown.trim()}`
    )
    .join('\n\n---\n\n')}\n`
}

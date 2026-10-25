import type { Locale } from './pages'
import { getLlmsPath, renderLlmsFullTxt, renderLlmsTxt } from './llms-txt'
import {
  getPageEntries,
  getPageRoute,
  locales,
  renderPage,
  renderPages
} from './pages'

/** Every LLM file of the site, keyed by its path (`/llms.txt`, `/en-US/components/button.md`, ...). */
export async function renderLlmsFiles(
  root: string
): Promise<Map<string, string>> {
  const files = new Map<string, string>()
  for (const locale of locales) {
    const pages = await renderPages(root, locale)
    files.set(getLlmsPath(locale, 'llms.txt'), renderLlmsTxt(locale, pages))
    files.set(getLlmsPath(locale, 'llms-full.txt'), renderLlmsFullTxt(pages))
    for (const page of pages) files.set(`${page.route}.md`, page.markdown)
  }
  return files
}

/** One LLM file by its path, or `undefined` when the path isn't one. */
export async function renderLlmsFile(
  root: string,
  urlPath: string
): Promise<string | undefined> {
  for (const locale of locales) {
    if (urlPath === getLlmsPath(locale, 'llms.txt'))
      return renderLlmsTxt(locale, await renderPages(root, locale))
    if (urlPath === getLlmsPath(locale, 'llms-full.txt'))
      return renderLlmsFullTxt(await renderPages(root, locale))
  }
  const match = /^\/([^/]+)\/(docs|components)\/([^/]+)\.md$/.exec(urlPath)
  if (!match || !locales.includes(match[1] as Locale))
    return undefined
  const entry = getPageEntries(match[1] as Locale).find(
    entry => getPageRoute(entry) === urlPath.slice(0, -'.md'.length)
  )
  return entry && (await renderPage(root, entry)).markdown
}

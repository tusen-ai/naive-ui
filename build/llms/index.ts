import { getLlmsPath, renderLlmsFullTxt, renderLlmsTxt } from './llms-txt'
import { renderPage, renderPages } from './page-markdown'
import { getPageEntries, getPageRoute, locales } from './site'

type Render = () => Promise<string>

/** How to build each LLM file, keyed by its path. */
function getLlmsFileRenderers(root: string): Map<string, Render> {
  const renderers = new Map<string, Render>()
  for (const locale of locales) {
    renderers.set(getLlmsPath(locale, 'llms.txt'), async () =>
      renderLlmsTxt(locale, await renderPages(root, locale)))
    renderers.set(getLlmsPath(locale, 'llms-full.txt'), async () =>
      renderLlmsFullTxt(await renderPages(root, locale)))
    for (const entry of getPageEntries(locale)) {
      renderers.set(
        `${getPageRoute(entry)}.md`,
        async () => (await renderPage(root, entry)).markdown
      )
    }
  }
  return renderers
}

/**
 * One LLM file by its path (`/llms.txt`, `/en-US/components/button.md`, ...),
 * or `undefined` when the path isn't one.
 */
export async function renderLlmsFile(
  root: string,
  urlPath: string
): Promise<string | undefined> {
  return getLlmsFileRenderers(root).get(urlPath)?.()
}

/** Every LLM file, keyed by its path. Each page is rendered once. */
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

import type { Category, LlmsLogger, Locale, ProcessedDoc } from './types'
import { i18n, locales } from './constants'
import { buildProcessedDocs } from './markdown'
import { getRoutes } from './routes'

export async function genLlmsTxt(
  projectRoot: string,
  locale: Locale = 'en-US',
  processedDocs?: ProcessedDoc[],
  onWarn?: (message: string, error?: unknown) => void
): Promise<string> {
  const docs = (
    processedDocs ?? (await buildProcessedDocs(projectRoot, undefined, onWarn))
  ).filter(d => d.route.locale === locale)
  const t = i18n[locale]
  const lines: string[] = []

  lines.push('# Naive UI')
  lines.push('')
  lines.push(t.description)
  lines.push('')

  for (const category of ['docs', 'components'] as Category[]) {
    const group = docs.filter(d => d.route.category === category)
    if (group.length === 0)
      continue

    lines.push(`## ${category === 'docs' ? t.docs : t.components}`)
    lines.push('')

    for (const { route, title } of group) {
      lines.push(`- [${title}](/${locale}/${category}/${route.routePath}.md)`)
    }
    lines.push('')
  }

  return lines.join('\n')
}

export async function genLlmsFullTxt(
  projectRoot: string,
  locale: Locale = 'en-US',
  processedDocs?: ProcessedDoc[],
  onWarn?: (message: string, error?: unknown) => void
): Promise<string> {
  const docs = (
    processedDocs ?? (await buildProcessedDocs(projectRoot, undefined, onWarn))
  ).filter(d => d.route.locale === locale)

  return docs
    .map(
      ({ route, content }) =>
        `---\nurl: /${locale}/${route.category}/${route.routePath}.md\n---\n\n${content}`
    )
    .join('\n')
}

export async function emitLlmsFiles(
  projectRoot: string,
  emitAsset: (fileName: string, source: string) => void,
  logger: LlmsLogger
): Promise<void> {
  const routes = await getRoutes(projectRoot)
  const processedDocs = await buildProcessedDocs(
    projectRoot,
    routes,
    logger.warn
  )

  const localizedOutputs = await Promise.all(
    locales.map(async (locale) => {
      const docs = processedDocs.filter(d => d.route.locale === locale)
      const llmsTxt = await genLlmsTxt(projectRoot, locale, processedDocs)
      const fullTxt = await genLlmsFullTxt(projectRoot, locale, processedDocs)
      return { locale, docs, llmsTxt, fullTxt }
    })
  )

  for (const { locale, docs, llmsTxt, fullTxt } of localizedOutputs) {
    emitAsset(`${locale}/llms.txt`, llmsTxt)
    emitAsset(`${locale}/llms-full.txt`, fullTxt)

    for (const { route, content } of docs) {
      emitAsset(`${locale}/${route.category}/${route.routePath}.md`, content)
    }
  }

  const defaultOutput = localizedOutputs.find(d => d.locale === 'en-US')!
  emitAsset('llms.txt', defaultOutput.llmsTxt)
  emitAsset('llms-full.txt', defaultOutput.fullTxt)

  logger.info(
    `[naive-ui-llms-txt] Generated clean, non-redundant canonical LLMS files.`
  )
}

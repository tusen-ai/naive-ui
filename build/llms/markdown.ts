import type { ProcessedDoc, RouteEntry } from './types'
import fs from 'node:fs'
import remarkStringify from 'remark-stringify'
import { createBaseProcessor } from '../markdown/parser'
import { remarkCleanForLlms } from '../markdown/plugins/remark-clean-for-llms'
import { remarkExpandDemos } from '../markdown/plugins/remark-expand-demos'
import { getRoutes } from './routes'

export function formatRouteTitle(routePath: string): string {
  return routePath
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export function extractTitleFromMarkdown(content: string): string | null {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : null
}

export async function buildProcessedDocs(
  projectRoot: string,
  routes?: RouteEntry[],
  onWarn?: (message: string, error?: unknown) => void
): Promise<ProcessedDoc[]> {
  const sourceRoutes = routes ?? (await getRoutes(projectRoot))

  return (
    await Promise.all(
      sourceRoutes.map(async (route) => {
        try {
          const rawContent = await fs.promises.readFile(route.filePath, 'utf-8')
          const content = await cleanMarkdown(rawContent, route.filePath)
          const title
            = extractTitleFromMarkdown(rawContent)
              ?? formatRouteTitle(route.routePath)
          return { route, title, content }
        }
        catch (e) {
          onWarn?.(`[naive-ui-llms-txt] Skipped ${route.filePath}`, e)
          return null
        }
      })
    )
  ).filter((doc): doc is ProcessedDoc => doc !== null)
}

export async function cleanMarkdown(
  content: string,
  sourceFilePath: string
): Promise<string> {
  const processor = createBaseProcessor()
    .use(remarkExpandDemos)
    .use(remarkCleanForLlms)
    .use(remarkStringify)

  const file = await processor.process({
    value: content,
    data: { sourceFilePath }
  })
  return String(file)
}

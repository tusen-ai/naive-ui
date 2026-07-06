import type { ProcessedDoc, RouteEntry } from './types'
import fs from 'node:fs'
import remarkStringify from 'remark-stringify'
import { createBaseProcessor } from '../markdown/parser'
import { remarkCleanMdForLlms } from '../markdown/plugins/remark-clean-md-for-llms'
import { remarkExpandDemos } from '../markdown/plugins/remark-expand-demos'
import { remarkNormalizeLlmsLinks } from '../markdown/plugins/remark-normalize-llms-links'
import { getRoutes } from './routes'

export interface CleanMarkdownOptions {
  route: RouteEntry
  routes: RouteEntry[]
  onWarn?: (message: string, error?: unknown) => void
  strict?: boolean
}

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
          const content = await cleanMarkdown(rawContent, {
            route,
            routes: sourceRoutes,
            onWarn,
            strict: true
          })
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
  options: CleanMarkdownOptions
): Promise<string> {
  const { route, routes, onWarn, strict = false } = options
  const processor = createBaseProcessor()
    .use(remarkExpandDemos, { onWarn, strict })
    .use(remarkCleanMdForLlms)
    .use(remarkNormalizeLlmsLinks, {
      route,
      routes,
      onWarn: message => onWarn?.(message)
    })
    .use(remarkStringify)

  const file = await processor.process({
    value: content,
    data: { sourceFilePath: route.filePath }
  })
  return String(file)
}

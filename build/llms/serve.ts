import type { ServerResponse } from 'node:http'
import type { Category, LlmsAction, Locale } from './types'
import fs from 'node:fs'
import { cleanMarkdown } from './markdown'
import { resolveSourceMd } from './routes'

export function matchLlmsAction(url: string): LlmsAction | null {
  const [path] = url.split('?')

  // 1. Match Root-level files: /llms.txt or /llms-full.txt
  const rootMatch = path.match(/^\/(llms(?:-full)?\.txt)$/)
  if (rootMatch) {
    return {
      type: rootMatch[1] === 'llms.txt' ? 'llms-txt' : 'llms-full-txt',
      locale: 'en-US'
    }
  }

  // 2. Match Localized Canonical Paths:
  // e.g., /zh-CN/llms.txt or /zh-CN/docs/intro.md
  const locMatch = path.match(
    /^\/(zh-CN|en-US)\/(?:(llms(?:-full)?\.txt)|(docs|components)\/(.+)\.md)$/
  )
  if (!locMatch)
    return null

  const [, locale, txtFile, category, slug] = locMatch

  if (txtFile) {
    return {
      type: txtFile === 'llms.txt' ? 'llms-txt' : 'llms-full-txt',
      locale: locale as Locale
    }
  }

  return {
    type: 'md',
    locale: locale as Locale,
    category: category as Category,
    slug
  }
}

export async function serveMd(
  res: ServerResponse,
  projectRoot: string,
  locale: Locale,
  category: Category,
  slug: string,
  url: string
): Promise<void> {
  const filePath = await resolveSourceMd(projectRoot, locale, category, slug)

  if (filePath && fs.existsSync(filePath)) {
    const raw = await fs.promises.readFile(filePath, 'utf-8')
    const cleaned = await cleanMarkdown(raw, filePath)
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8')
    res.end(cleaned)
    return
  }

  res.statusCode = 404
  res.end(`Not found: ${url}`)
}

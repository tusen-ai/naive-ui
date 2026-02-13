import type { Code, RootContent } from 'mdast'
import type { ServerResponse } from 'node:http'
import type { Plugin, ResolvedConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { gfmFromMarkdown, gfmToMarkdown } from 'mdast-util-gfm'
import { toMarkdown } from 'mdast-util-to-markdown'
import { gfm } from 'micromark-extension-gfm'
import { visit } from 'unist-util-visit'

type Category = 'docs' | 'components'
type Locale = 'en-US' | 'zh-CN'
type Theme = 'light' | 'dark' | 'os-theme'

type LlmsAction
  = | { type: 'llms-txt', locale: Locale }
    | { type: 'llms-full-txt', locale: Locale }
    | { type: 'md', locale: Locale, category: Category, slug: string }

interface RouteEntry {
  routePath: string
  filePath: string
  category: Category
  locale: Locale
}

interface RouteEntries {
  name: string
  category: Category
  locale: Locale
}

const categories: Category[] = ['docs', 'components']
const locales: Locale[] = ['en-US', 'zh-CN']
const themes: Theme[] = ['light', 'dark', 'os-theme']
const llmsFiles: string[] = ['llms.txt', 'llms-full.txt']

export function llmsTxtPlugin(): Plugin {
  let projectRoot: string
  let resolvedConfig: ResolvedConfig

  return {
    name: 'naive-ui-llms-txt',
    configResolved(config) {
      projectRoot = config.root
      resolvedConfig = config
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] || ''
        const action = resolveUrl(url)

        if (!action) {
          next()
          return
        }

        if (action.type === 'llms-txt') {
          const content = genLlmsTxt(projectRoot, action.locale)
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end(content)
          return
        }

        if (action.type === 'llms-full-txt') {
          const content = genLlmsFullTxt(projectRoot, action.locale)
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end(content)
          return
        }

        if (action.type === 'md') {
          serveMd(
            res,
            projectRoot,
            action.locale,
            action.category,
            action.slug,
            url
          )
        }
      })
    },
    closeBundle() {
      if (resolvedConfig.command !== 'build')
        return

      const outDir = path.resolve(projectRoot, resolvedConfig.build.outDir)

      emitLlmsFiles(projectRoot, outDir)
    }
  }
}

function resolveUrl(url: string): LlmsAction | null {
  // Normalize parts and extract optional locale prefix
  // URL sheme: /{locale?}/{theme?}/{category?}/{filename?}
  const parts = url.split('/').filter(Boolean)
  let locale: Locale = 'en-US'
  const hasLocalePrefix = locales.includes(parts[0] as Locale)
  const hasThemePrefix = themes.includes(parts[1] as Theme)

  if (hasLocalePrefix)
    locale = parts.shift() as Locale

  if (parts.length === 0)
    return null

  const last = parts[parts.length - 1]
  // Handle top-level llms files like `/llms.txt`, `/en-US/llms.txt` or `/docs/llms.txt`
  if (parts.length <= 2 && llmsFiles.includes(last)) {
    return {
      type: last === 'llms.txt' ? 'llms-txt' : 'llms-full-txt',
      locale
    }
  }

  let category: string
  let filename: string

  if (parts.length === 2) {
    category = parts[0]
    filename = parts[1]
  }
  else if (hasThemePrefix && hasLocalePrefix) {
    category = parts[1]
    filename = parts[2]
  }
  else {
    return null
  }

  if (categories.includes(category as Category) && filename.endsWith('.md')) {
    return {
      type: 'md',
      locale,
      category: category as Category,
      slug: filename.slice(0, -3)
    }
  }

  return null
}

function serveMd(
  res: ServerResponse,
  projectRoot: string,
  locale: Locale,
  category: Category,
  slug: string,
  url: string
): void {
  const filePath = resolveSourceMd(projectRoot, locale, category, slug)

  if (filePath && fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const cleaned = cleanMarkdown(raw, filePath)
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8')
    res.end(cleaned)
    return
  }

  res.statusCode = 404
  res.end(`Not found: ${url}`)
}

let routeCache: RouteEntry[] | null = null

const SKIP_ROUTES = new Set(['from-v1'])

function getRoutes(projectRoot: string): RouteEntry[] {
  if (routeCache)
    return routeCache

  const routesFile = fs.readFileSync(
    path.resolve(projectRoot, 'demo/routes/routes.js'),
    'utf-8'
  )

  const routes: RouteEntry[] = []
  const routeEntries: RouteEntries[] = [
    { name: 'enDocRoutes', category: 'docs', locale: 'en-US' },
    { name: 'zhDocRoutes', category: 'docs', locale: 'zh-CN' },
    { name: 'enComponentRoutes', category: 'components', locale: 'en-US' },
    { name: 'zhComponentRoutes', category: 'components', locale: 'zh-CN' }
  ]

  for (const routeEntry of routeEntries) {
    const routeEntryRegex = new RegExp(
      `export const ${routeEntry.name}\\s*=\\s*\\[([\\s\\S]*?)\\n\\]`,
      'm'
    )
    const routeEntryMatch = routesFile.match(routeEntryRegex)
    if (!routeEntryMatch)
      continue

    const importRegex = /path:\s*'([^']+)'[\s\S]*?import\(\s*'([^']+)'\s*\)/g

    for (const match of routeEntryMatch[1].matchAll(importRegex)) {
      const routePath = match[1]
      const importPath = match[2]

      if (SKIP_ROUTES.has(routePath))
        continue

      const resolvedImport = path.resolve(
        projectRoot,
        'demo/routes',
        importPath
      )

      if (importPath.endsWith('.vue')) {
        // .vue wrappers may import a .md file — extract it
        const mdPath = extractMdPath(resolvedImport)
        if (mdPath) {
          routes.push({
            routePath,
            filePath: mdPath,
            category: routeEntry.category,
            locale: routeEntry.locale
          })
        }
        continue
      }

      routes.push({
        routePath,
        filePath: resolvedImport,
        category: routeEntry.category,
        locale: routeEntry.locale
      })
    }
  }

  routeCache = routes
  return routes
}

function extractMdPath(vuePath: string): string | null {
  if (!fs.existsSync(vuePath))
    return null
  const content = fs.readFileSync(vuePath, 'utf-8')
  const mdImport = content.match(/import\s+\w+\s+from\s+['"]([^'"]+\.md)['"]/i)
  if (!mdImport)
    return null
  return path.resolve(path.dirname(vuePath), mdImport[1])
}

function resolveSourceMd(
  projectRoot: string,
  locale: Locale,
  category: Category,
  slug: string
): string | null {
  const routes = getRoutes(projectRoot)

  const entry = routes.find(
    r =>
      r.routePath === slug && r.locale === locale && r.category === category
  )
  return entry?.filePath ?? null
}

function extractTitle(filePath: string): string | null {
  if (!fs.existsSync(filePath))
    return null
  const content = fs.readFileSync(filePath, 'utf-8')
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : null
}

const gfmParseOptions = {
  extensions: [gfm()],
  mdastExtensions: [gfmFromMarkdown()]
}

function cleanMarkdown(content: string, sourceFilePath: string): string {
  const tree = fromMarkdown(content, gfmParseOptions)

  expandDemoNodes(tree.children, sourceFilePath)

  // Remove ```component blocks and all HTML nodes (comments, Vue components)
  visit(tree, (node, index, parent) => {
    if (index == null || !parent)
      return

    if (node.type === 'code' && (node as Code).lang === 'component') {
      parent.children.splice(index, 1)
      return index
    }

    if (node.type === 'html') {
      parent.children.splice(index, 1)
      return index
    }
  })

  return toMarkdown(tree, {
    extensions: [gfmToMarkdown()]
  })
}

function expandDemoNodes(
  children: RootContent[],
  sourceFilePath: string
): void {
  const sourceDir = path.dirname(sourceFilePath)

  for (let i = children.length - 1; i >= 0; i--) {
    const node = children[i]
    if (node.type !== 'code' || (node as Code).lang !== 'demo')
      continue

    const filenames = (node as Code).value.split('\n').map(f => f.trim()).filter(Boolean)

    const replacement: RootContent[] = []

    for (const filename of filenames) {
      if (filename.includes('debug'))
        continue

      const demoFileName = filename.replace(/\.vue$/, '.demo.vue')
      const demoFilePath = path.join(sourceDir, demoFileName)

      if (!fs.existsSync(demoFilePath))
        continue

      const demoContent = fs.readFileSync(demoFilePath, 'utf-8')

      const mdMatch = demoContent.match(/<markdown>([\s\S]*?)<\/markdown>/)
      if (mdMatch) {
        const mdTree = fromMarkdown(mdMatch[1].trim(), gfmParseOptions)
        replacement.push(...mdTree.children)
      }

      const codePart = demoContent
        .replace(/<markdown>[\s\S]*?<\/markdown>\n?/, '')
        .trim()

      if (codePart) {
        replacement.push({
          type: 'code',
          lang: 'vue',
          value: codePart
        })
      }
    }

    children.splice(i, 1, ...replacement)
  }
}

const i18n: Record<
  Locale,
  {
    description: string
    docs: string
    components: string
  }
> = {
  'en-US': {
    description:
      '> A Vue 3 Component Library. Fairly Complete, Theme Customizable, Uses TypeScript, Fast.',
    docs: 'Docs',
    components: 'Components'
  },
  'zh-CN': {
    description:
      '> 一个 Vue 3 组件库。比较完整，主题可调，使用 TypeScript，快。',
    docs: '文档',
    components: '组件'
  }
}

function genLlmsTxt(projectRoot: string, locale: Locale = 'en-US'): string {
  const routes = getRoutes(projectRoot)
  const localeRoutes = routes.filter(r => r.locale === locale)
  const t = i18n[locale]
  const lines: string[] = []

  lines.push('# Naive UI')
  lines.push('')
  lines.push(t.description)
  lines.push('')

  for (const category of ['docs', 'components'] as Category[]) {
    const group = localeRoutes.filter(r => r.category === category)
    if (group.length === 0)
      continue

    lines.push(`## ${category === 'docs' ? t.docs : t.components}`)
    lines.push('')

    for (const route of group) {
      const title
        = extractTitle(route.filePath)
          ?? route.routePath
            .split('-')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ')
      lines.push(`- [${title}](/${locale}/${category}/${route.routePath}.md)`)
    }
    lines.push('')
  }

  return lines.join('\n')
}

function genLlmsFullTxt(projectRoot: string, locale: Locale = 'en-US'): string {
  const routes = getRoutes(projectRoot)
  const localeRoutes = routes.filter(r => r.locale === locale)
  const parts: string[] = []

  for (const route of localeRoutes) {
    if (!fs.existsSync(route.filePath))
      continue
    const raw = fs.readFileSync(route.filePath, 'utf-8')
    const cleaned = cleanMarkdown(raw, route.filePath)
    parts.push(
      `---\nurl: /${locale}/${route.category}/${route.routePath}.md\n---\n\n${cleaned}`
    )
  }

  return parts.join('\n')
}

function emitLlmsFiles(projectRoot: string, outDir: string): void {
  const routes = getRoutes(projectRoot)

  for (const route of routes) {
    if (!fs.existsSync(route.filePath))
      continue

    const rawContent = fs.readFileSync(route.filePath, 'utf-8')
    const cleanedContent = cleanMarkdown(rawContent, route.filePath)

    const category = route.category
    const mdOutDir = path.join(outDir, route.locale, category)
    const mdOutFile = path.join(mdOutDir, `${route.routePath}.md`)

    fs.mkdirSync(mdOutDir, { recursive: true })
    fs.writeFileSync(mdOutFile, cleanedContent, 'utf-8')
  }

  for (const locale of ['en-US', 'zh-CN'] as Locale[]) {
    const langDir = path.join(outDir, locale)
    fs.mkdirSync(langDir, { recursive: true })

    const llmsTxt = genLlmsTxt(projectRoot, locale)
    fs.writeFileSync(path.join(langDir, 'llms.txt'), llmsTxt, 'utf-8')

    const llmsFullTxt = genLlmsFullTxt(projectRoot, locale)
    fs.writeFileSync(path.join(langDir, 'llms-full.txt'), llmsFullTxt, 'utf-8')
  }

  fs.writeFileSync(
    path.join(outDir, 'llms.txt'),
    genLlmsTxt(projectRoot, 'en-US'),
    'utf-8'
  )
  fs.writeFileSync(
    path.join(outDir, 'llms-full.txt'),
    genLlmsFullTxt(projectRoot, 'en-US'),
    'utf-8'
  )

  const enCount = routes.filter(r => r.locale === 'en-US').length
  const zhCount = routes.filter(r => r.locale === 'zh-CN').length
  // eslint-disable-next-line no-console
  console.log(
    `[naive-ui-llms-txt] Generated ${enCount} en + ${zhCount} zh .md files, llms.txt, llms-full.txt`
  )
}

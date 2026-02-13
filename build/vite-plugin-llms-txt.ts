import type { Code, RootContent } from 'mdast'
import type { Plugin, ResolvedConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { gfmFromMarkdown, gfmToMarkdown } from 'mdast-util-gfm'
import { toMarkdown } from 'mdast-util-to-markdown'
import { gfm } from 'micromark-extension-gfm'
import { visit } from 'unist-util-visit'

/**
 * Vite plugin that serves LLM-friendly .md files, llms.txt, and
 * llms-full.txt.
 *
 * - During development these are served on-the-fly via middleware.
 * - During production build they are written to the output directory
 *   via the closeBundle hook.
 */
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
        const url = req.url || ''

        // Handle llms.txt — optionally locale-prefixed
        const llmsTxtMatch = url.match(/^(?:\/(en-US|zh-CN))?\/llms\.txt$/)
        if (llmsTxtMatch) {
          const locale = llmsTxtMatch[1] === 'zh-CN' ? 'zh' : 'en'
          const content = genLlmsTxt(projectRoot, locale)
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end(content)
          return
        }

        // Handle llms-full.txt — optionally locale-prefixed
        const llmsFullMatch = url.match(
          /^(?:\/(en-US|zh-CN))?\/llms-full\.txt$/
        )
        if (llmsFullMatch) {
          const locale = llmsFullMatch[1] === 'zh-CN' ? 'zh' : 'en'
          const content = genLlmsFullTxt(projectRoot, locale)
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end(content)
          return
        }

        // Handle flat paths: /docs/*.md, /components/*.md, /zh-docs/*.md, /zh-components/*.md
        const flatMatch = url.match(
          /^\/(docs|components|zh-docs|zh-components)\/([a-z0-9-]+)\.md$/
        )
        if (flatMatch) {
          const [, dir, slug] = flatMatch
          return serveMd(res, projectRoot, dir, slug, url)
        }

        // Handle SPA-style paths: /{lang}/{theme}/(docs|components)/{slug}.md
        // e.g. /zh-CN/os-theme/components/button.md
        //      /en-US/os-theme/docs/introduction.md
        const spaMatch = url.match(
          /^\/(en-US|zh-CN)\/[^/]+\/(docs|components)\/([a-z0-9-]+)\.md$/
        )
        if (spaMatch) {
          const [, lang, category, slug] = spaMatch
          const dir
            = lang === 'zh-CN'
              ? category === 'components'
                ? 'zh-components'
                : 'zh-docs'
              : category === 'components'
                ? 'components'
                : 'docs'
          return serveMd(res, projectRoot, dir, slug, url)
        }

        next()
      })
    },
    closeBundle() {
      if (resolvedConfig.command !== 'build')
        return

      const outDir = path.resolve(
        projectRoot,
        resolvedConfig.build.outDir || 'site'
      )

      writeStaticLlmsFiles(projectRoot, outDir)
    }
  }
}

function serveMd(
  res: import('node:http').ServerResponse,
  projectRoot: string,
  dir: string,
  slug: string,
  url: string
): void {
  const filePath = resolveSourceMd(projectRoot, dir, slug)

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

type Category = 'docs' | 'components'
type Locale = 'en' | 'zh'
interface RouteEntry {
  routePath: string
  filePath: string
  category: Category
  locale: Locale
}

interface RouteBlock {
  name: string
  category: Category
  locale: Locale
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
  const blocks: RouteBlock[] = [
    { name: 'enDocRoutes', category: 'docs', locale: 'en' },
    { name: 'zhDocRoutes', category: 'docs', locale: 'zh' },
    { name: 'enComponentRoutes', category: 'components', locale: 'en' },
    { name: 'zhComponentRoutes', category: 'components', locale: 'zh' }
  ]

  for (const block of blocks) {
    const blockRegex = new RegExp(
      `export const ${block.name}\\s*=\\s*\\[([\\s\\S]*?)\\n\\]`,
      'm'
    )
    const blockMatch = routesFile.match(blockRegex)
    if (!blockMatch)
      continue

    const importRegex = /path:\s*'([^']+)'[\s\S]*?import\(\s*'([^']+)'\s*\)/g

    for (const match of blockMatch[1].matchAll(importRegex)) {
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
        const mdPath = extractMdFromVue(resolvedImport)
        if (mdPath) {
          routes.push({
            routePath,
            filePath: mdPath,
            category: block.category,
            locale: block.locale
          })
        }
        continue
      }

      routes.push({
        routePath,
        filePath: resolvedImport,
        category: block.category,
        locale: block.locale
      })
    }
  }

  routeCache = routes
  return routes
}

/**
 * Read a .vue wrapper file and extract the first `.md` import path.
 * e.g. `import Changelog from '../../../../../CHANGELOG.en-US.md'`
 */
function extractMdFromVue(vuePath: string): string | null {
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
  dir: string,
  slug: string
): string | null {
  const routes = getRoutes(projectRoot)

  const locale = dir.startsWith('zh') ? 'zh' : 'en'
  const category = dir.includes('component') ? 'components' : 'docs'

  const entry = routes.find(
    r =>
      r.routePath === slug && r.locale === locale && r.category === category
  )
  return entry?.filePath ?? null
}

const gfmParseOptions = {
  extensions: [gfm()],
  mdastExtensions: [gfmFromMarkdown()]
}

function cleanMarkdown(content: string, sourceFilePath: string): string {
  const tree = fromMarkdown(content, gfmParseOptions)

  // Expand ```demo blocks by inlining .demo.vue file contents
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

/**
 * Walk the node list and replace ```demo code blocks with expanded content.
 */
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

// ---------------------------------------------------------------------------
// llms.txt / llms-full.txt generation
// ---------------------------------------------------------------------------

function genLlmsTxt(projectRoot: string, locale: Locale = 'en'): string {
  const routes = getRoutes(projectRoot)
  const localeRoutes = routes.filter(r => r.locale === locale)
  const lang = locale === 'en' ? 'en-US' : 'zh-CN'
  const lines: string[] = []

  lines.push('# Naive UI')
  lines.push('')
  lines.push(
    '> A Vue 3 Component Library. Fairly Complete, Theme Customizable, Uses TypeScript, Fast.'
  )
  lines.push('')

  for (const category of ['docs', 'components']) {
    const group = localeRoutes.filter(r => r.category === category)
    if (group.length === 0)
      continue

    lines.push(`## ${category === 'docs' ? 'Docs' : 'Components'}`)
    lines.push('')

    for (const route of group) {
      const title = route.routePath
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
      lines.push(
        `- [${title}](/${lang}/os-theme/${category}/${route.routePath}.md)`
      )
    }
    lines.push('')
  }

  return lines.join('\n')
}

function genLlmsFullTxt(projectRoot: string, locale: Locale = 'en'): string {
  const routes = getRoutes(projectRoot)
  const localeRoutes = routes.filter(r => r.locale === locale)
  const lang = locale === 'en' ? 'en-US' : 'zh-CN'
  const parts: string[] = []

  for (const route of localeRoutes) {
    if (!fs.existsSync(route.filePath))
      continue
    const raw = fs.readFileSync(route.filePath, 'utf-8')
    const cleaned = cleanMarkdown(raw, route.filePath)
    parts.push(
      `---\nurl: /${lang}/os-theme/${route.category}/${route.routePath}.md\n---\n\n${cleaned}`
    )
  }

  return parts.join('\n')
}

// ---------------------------------------------------------------------------
// Static file writing (production build)
// ---------------------------------------------------------------------------

function writeStaticLlmsFiles(projectRoot: string, outDir: string): void {
  const routes = getRoutes(projectRoot)

  // Write per-page .md files (en + zh)
  for (const route of routes) {
    if (!fs.existsSync(route.filePath))
      continue

    const rawContent = fs.readFileSync(route.filePath, 'utf-8')
    const cleanedContent = cleanMarkdown(rawContent, route.filePath)

    const lang = route.locale === 'en' ? 'en-US' : 'zh-CN'
    const category = route.category
    const mdOutDir = path.join(outDir, lang, 'os-theme', category)
    const mdOutFile = path.join(mdOutDir, `${route.routePath}.md`)

    fs.mkdirSync(mdOutDir, { recursive: true })
    fs.writeFileSync(mdOutFile, cleanedContent, 'utf-8')
  }

  // Write locale-specific llms.txt and llms-full.txt
  for (const locale of ['en', 'zh'] as const) {
    const lang = locale === 'en' ? 'en-US' : 'zh-CN'
    const langDir = path.join(outDir, lang)
    fs.mkdirSync(langDir, { recursive: true })

    const llmsTxt = genLlmsTxt(projectRoot, locale)
    fs.writeFileSync(path.join(langDir, 'llms.txt'), llmsTxt, 'utf-8')

    const llmsFullTxt = genLlmsFullTxt(projectRoot, locale)
    fs.writeFileSync(path.join(langDir, 'llms-full.txt'), llmsFullTxt, 'utf-8')
  }

  // Root-level defaults (English)
  fs.writeFileSync(
    path.join(outDir, 'llms.txt'),
    genLlmsTxt(projectRoot, 'en'),
    'utf-8'
  )
  fs.writeFileSync(
    path.join(outDir, 'llms-full.txt'),
    genLlmsFullTxt(projectRoot, 'en'),
    'utf-8'
  )

  const enCount = routes.filter(r => r.locale === 'en').length
  const zhCount = routes.filter(r => r.locale === 'zh').length
  // eslint-disable-next-line no-console
  console.log(
    `[naive-ui-llms-txt] Generated ${enCount} en + ${zhCount} zh .md files, llms.txt, llms-full.txt`
  )
}

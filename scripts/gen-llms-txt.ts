import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __scriptDir
  = typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__scriptDir, '..')
const siteDir = path.resolve(projectRoot, 'site')
const baseUrl = process.env.NAIVE_UI_BASE_URL || 'https://www.naiveui.com'

// ---------------------------------------------------------------------------
// Route definitions (mirrored from demo/routes/routes.js)
// We parse them from the source rather than importing to avoid needing the
// full demo environment.
// ---------------------------------------------------------------------------

interface RouteInfo {
  /** Route path segment, e.g. 'button' */
  routePath: string
  /** Absolute path to the source .md file */
  filePath: string
  /** Category: 'docs' or 'components' */
  category: 'docs' | 'components'
  /** Locale: 'en' or 'zh' */
  locale: 'en' | 'zh'
}

function parseRoutes(): RouteInfo[] {
  const routesFile = fs.readFileSync(
    path.resolve(projectRoot, 'demo/routes/routes.js'),
    'utf-8'
  )

  const routes: RouteInfo[] = []

  // Identify which export block we are in
  const blocks = [
    { name: 'enDocRoutes', category: 'docs' as const, locale: 'en' as const },
    {
      name: 'zhDocRoutes',
      category: 'docs' as const,
      locale: 'zh' as const
    },
    {
      name: 'enComponentRoutes',
      category: 'components' as const,
      locale: 'en' as const
    },
    {
      name: 'zhComponentRoutes',
      category: 'components' as const,
      locale: 'zh' as const
    }
  ]

  for (const block of blocks) {
    const blockRegex = new RegExp(
      `export const ${block.name}\\s*=\\s*\\[([\\s\\S]*?)\\n\\]`,
      'm'
    )
    const blockMatch = routesFile.match(blockRegex)
    if (!blockMatch)
      continue

    const blockContent = blockMatch[1]

    const localImportRegex
      = /path:\s*'([^']+)'[\s\S]*?import\(\s*'([^']+)'\s*\)/g
    let match: RegExpExecArray | null = localImportRegex.exec(blockContent)

    while (match !== null) {
      const routePath = match[1]
      const importPath = match[2]

      // Skip .vue imports (e.g. changelog)
      if (importPath.endsWith('.vue')) {
        match = localImportRegex.exec(blockContent)
        continue
      }

      // Resolve the import path relative to demo/routes/
      const filePath = path.resolve(projectRoot, 'demo/routes', importPath)

      routes.push({
        routePath,
        filePath,
        category: block.category,
        locale: block.locale
      })
      match = localImportRegex.exec(blockContent)
    }
  }

  return routes
}

// ---------------------------------------------------------------------------
// Clean markdown content for LLM consumption
// ---------------------------------------------------------------------------

function cleanMarkdown(content: string, sourceFilePath: string): string {
  let cleaned = content

  // Remove <!--anchor:on--> and similar HTML comments
  cleaned = cleaned.replace(/<!--[\s\S]*?-->\n?/g, '')

  // Expand ```demo ... ``` blocks by inlining demo file contents
  cleaned = expandDemoBlocks(cleaned, sourceFilePath)

  // Remove ```component ... ``` blocks
  cleaned = cleaned.replace(/```component\n[\s\S]*?```\n?/g, '')

  // Remove Vue/HTML component blocks with proper nesting support
  // Handles <n-card>...<n-button>...</n-button>...</n-card>, <template>, <img>, <ArrowDownload16Regular /> etc.
  cleaned = removeHtmlBlocks(cleaned)

  // Collapse 3+ consecutive blank lines into 2
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n')

  // Trim leading/trailing whitespace
  cleaned = `${cleaned.trim()}\n`

  return cleaned
}

/**
 * Expand ```demo blocks by reading each referenced .demo.vue file and
 * inlining its markdown description + Vue code as a code block.
 */
function expandDemoBlocks(content: string, sourceFilePath: string): string {
  const sourceDir = path.dirname(sourceFilePath)

  return content.replace(
    /```demo\n([\s\S]*?)```\n?/g,
    (_match, fileList: string) => {
      const filenames = fileList
        .trim()
        .split('\n')
        .map((f: string) => f.trim())
        .filter(Boolean)

      const expanded: string[] = []

      for (const filename of filenames) {
        // demo block lists "basic.vue" but actual file is "basic.demo.vue"
        const demoFileName = filename.replace(/\.vue$/, '.demo.vue')
        const demoFilePath = path.join(sourceDir, demoFileName)

        if (!fs.existsSync(demoFilePath)) {
          continue
        }

        const demoContent = fs.readFileSync(demoFilePath, 'utf-8')

        // Extract <markdown>...</markdown> section
        const mdMatch = demoContent.match(/<markdown>([\s\S]*?)<\/markdown>/)
        const markdownPart = mdMatch ? mdMatch[1].trim() : ''

        // Extract Vue code (everything outside <markdown>...</markdown>)
        const codePart = demoContent
          .replace(/<markdown>[\s\S]*?<\/markdown>\n?/, '')
          .trim()

        if (markdownPart) {
          expanded.push(markdownPart)
        }
        if (codePart) {
          expanded.push(`\`\`\`vue\n${codePart}\n\`\`\``)
        }
        expanded.push('')
      }

      return expanded.join('\n')
    }
  )
}

/**
 * Remove HTML/Vue component blocks from markdown content using a
 * line-by-line depth-tracking approach to handle nested tags correctly.
 */
function removeHtmlBlocks(content: string): string {
  const lines = content.split('\n')
  const result: string[] = []
  let depth = 0
  let inCodeFence = false

  for (const line of lines) {
    const trimmed = line.trim()

    // Track fenced code blocks — never strip HTML inside them
    if (trimmed.startsWith('```')) {
      inCodeFence = !inCodeFence
      result.push(line)
      continue
    }

    if (inCodeFence) {
      result.push(line)
      continue
    }

    // Count opening tags (not self-closing) on this line
    const openTags
      = trimmed.match(/<[a-zA-Z][a-zA-Z0-9-]*(?:\s[^>]*)?(?<!\/)\s*>/g) || []
    // Count closing tags on this line
    const closeTags = trimmed.match(/<\/[a-zA-Z][a-zA-Z0-9-]+\s*>/g) || []
    // Count self-closing tags on this line (don't affect depth)
    const selfClosing
      = trimmed.match(/<[a-zA-Z][a-zA-Z0-9-]*(?:\s[^>]*)?\s*\/>/g) || []

    // If we're inside an HTML block, skip this line
    if (depth > 0) {
      depth += openTags.length - closeTags.length
      continue
    }

    // Check if this line starts a block-level HTML element (line starts with <)
    if (/^\s*<[a-zA-Z]/.test(line) && !isMarkdownHtml(trimmed)) {
      const netOpen = openTags.length - closeTags.length - 0
      if (netOpen > 0) {
        // Opening a block — start tracking depth
        depth = netOpen
        continue
      }
      else if (
        selfClosing.length > 0
        || (openTags.length > 0 && closeTags.length >= openTags.length)
      ) {
        // Self-contained on one line — skip it
        continue
      }
    }

    result.push(line)
  }

  return result.join('\n')
}

/**
 * Check if the HTML is standard markdown-allowed HTML that should be kept
 * (e.g. blockquote-like constructs). For this project we strip all HTML.
 */
function isMarkdownHtml(_line: string): boolean {
  return false
}

// ---------------------------------------------------------------------------
// Generate llms.txt index
// ---------------------------------------------------------------------------

function generateLlmsTxt(
  routes: RouteInfo[],
  mdUrlMap: Map<string, string>
): string {
  const lines: string[] = []

  lines.push('# Naive UI')
  lines.push('')
  lines.push(
    '> A Vue 3 Component Library. Fairly Complete, Theme Customizable, Uses TypeScript, Fast.'
  )
  lines.push('')

  // Group en-only routes by category
  const enRoutes = routes.filter(r => r.locale === 'en')
  const docs = enRoutes.filter(r => r.category === 'docs')
  const components = enRoutes.filter(r => r.category === 'components')

  if (docs.length > 0) {
    lines.push('## Docs')
    lines.push('')
    for (const route of docs) {
      const url = mdUrlMap.get(`en-docs-${route.routePath}`)
      const title = route.routePath
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
      if (url) {
        lines.push(`- [${title}](${url})`)
      }
    }
    lines.push('')
  }

  if (components.length > 0) {
    lines.push('## Components')
    lines.push('')
    for (const route of components) {
      const url = mdUrlMap.get(`en-components-${route.routePath}`)
      const title = route.routePath
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
      if (url) {
        lines.push(`- [${title}](${url})`)
      }
    }
    lines.push('')
  }

  return lines.join('\n')
}

// ---------------------------------------------------------------------------
// Generate llms-full.txt
// ---------------------------------------------------------------------------

function generateLlmsFullTxt(
  entries: Array<{ url: string, content: string }>
): string {
  const parts: string[] = []

  for (const entry of entries) {
    parts.push(`---\nurl: ${entry.url}\n---\n\n${entry.content}`)
  }

  return parts.join('\n')
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log('[gen-llms-txt] Parsing routes...')
  const routes = parseRoutes()
  console.log(`[gen-llms-txt] Found ${routes.length} routes`)

  const mdUrlMap = new Map<string, string>()
  const fullEntries: Array<{ url: string, content: string }> = []

  for (const route of routes) {
    if (!fs.existsSync(route.filePath)) {
      console.warn(`[gen-llms-txt] File not found: ${route.filePath}`)
      continue
    }

    const rawContent = fs.readFileSync(route.filePath, 'utf-8')
    const cleanedContent = cleanMarkdown(rawContent, route.filePath)

    // Determine output path and URL
    const lang = route.locale === 'en' ? 'en-US' : 'zh-CN'
    const category = route.category
    const outputDir = path.join(siteDir, lang, 'os-theme', category)
    const outputFile = path.join(outputDir, `${route.routePath}.md`)
    const url = `${baseUrl}/${lang}/os-theme/${category}/${route.routePath}.md`

    // Write per-page .md file
    fs.mkdirSync(outputDir, { recursive: true })
    fs.writeFileSync(outputFile, cleanedContent, 'utf-8')

    // Track for llms.txt and llms-full.txt
    const key = `${route.locale}-${route.category}-${route.routePath}`
    mdUrlMap.set(key, url)

    if (route.locale === 'en') {
      fullEntries.push({ url, content: cleanedContent })
    }
  }

  // Generate llms.txt
  const llmsTxt = generateLlmsTxt(routes, mdUrlMap)
  fs.writeFileSync(path.join(siteDir, 'llms.txt'), llmsTxt, 'utf-8')
  console.log('[gen-llms-txt] Generated llms.txt')

  // Generate llms-full.txt
  const llmsFullTxt = generateLlmsFullTxt(fullEntries)
  fs.writeFileSync(path.join(siteDir, 'llms-full.txt'), llmsFullTxt, 'utf-8')
  console.log('[gen-llms-txt] Generated llms-full.txt')

  // Summary
  const enCount = routes.filter(r => r.locale === 'en').length
  const zhCount = routes.filter(r => r.locale === 'zh').length
  console.log(
    `[gen-llms-txt] Done! Generated ${enCount} en + ${zhCount} zh .md files, llms.txt, llms-full.txt`
  )
}

main()

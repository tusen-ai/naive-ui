import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { cwd, exit } from 'node:process'
import { pathToFileURL } from 'node:url'

const DEFAULT_THEME = 'os-theme'
const DEFAULT_LOCALE = 'en-US'
const ROUTES_FILE = resolve(cwd(), 'demo/routes/routes.js')
const ROUTES_DIR = dirname(ROUTES_FILE)
const OUTPUT_FILE = resolve(cwd(), 'public/llms.txt')
const FULL_OUTPUT_FILE = resolve(cwd(), 'public/llms-full.txt')

type Section = 'docs' | 'components'

interface RouteEntry {
  path: string
  importPath: string
}

interface RouteSourceEntry {
  path: string
  component: () => Promise<unknown>
}

interface RoutesModule {
  enDocRoutes: RouteSourceEntry[]
  enComponentRoutes: RouteSourceEntry[]
}

const TITLE_OVERRIDES: Record<Section, Record<string, string>> = {
  docs: {
    introduction: 'Introduction',
    changelog: 'Change Log',
    'controlled-uncontrolled': 'Controlled & Uncontrolled',
    'import-on-demand': 'Import on Demand'
  },
  components: {}
}

function getImportPath(route: RouteSourceEntry): string {
  const match = route.component
    .toString()
    .match(/import\(\s*['"]([^'"]+)['"]\s*\)/)
  return match?.[1] || ''
}

function toRouteEntries(routeSourceEntries: RouteSourceEntry[]): RouteEntry[] {
  return routeSourceEntries.map(entry => ({
    path: entry.path,
    importPath: getImportPath(entry)
  }))
}

async function loadRoutesModule(): Promise<RoutesModule> {
  return (await import(pathToFileURL(ROUTES_FILE).href)) as RoutesModule
}

function createUrl(section: Section, path: string, markdown = false): string {
  const url = `/${DEFAULT_LOCALE}/${DEFAULT_THEME}/${section}/${path}`
  return markdown ? `${url}.md` : url
}

async function readMarkdownFromVueFile(filePath: string): Promise<string> {
  // Current llms generation iterates enDocRoutes/enComponentRoutes,
  // and currently only hits:
  // - demo/pages/docs/changelog/enUS/index.vue
  // which imports:
  // - CHANGELOG.en-US.md
  const source = await readFile(filePath, 'utf-8')
  const matches = [
    ...source.matchAll(/import\s+.+?\s+from\s+['"]([^'"]+\.md)['"]/g)
  ]

  if (!matches.length) {
    return ''
  }

  const markdownFiles = [...new Set(matches.map(match => match[1]))]
  const markdownContents = await Promise.all(
    markdownFiles.map(markdownFile =>
      readFile(resolve(dirname(filePath), markdownFile), 'utf-8')
    )
  )
  return markdownContents.join('\n\n')
}

async function readRouteMarkdownContent(sourcePath: string): Promise<string> {
  try {
    if (sourcePath.endsWith('.md')) {
      return await readFile(sourcePath, 'utf-8')
    }

    if (sourcePath.endsWith('.vue')) {
      return await readMarkdownFromVueFile(sourcePath)
    }

    return ''
  }
  catch (error) {
    console.warn(`Cannot read route source: ${sourcePath}`)
    console.warn(error)
    return ''
  }
}

function normalizeMarkdown(markdown: string): string {
  return markdown
    .replace(/\r\n/g, '\n')
    .replace(/^<!--.*?-->\s*$/gm, '')
    .trim()
}

function extractMarkdownTitle(markdown: string): string | undefined {
  const match = markdown.match(/^#\s+(.+)$/m)
  if (!match) {
    return undefined
  }
  return match[1].replace(/\s+#+\s*$/, '').trim() || undefined
}

async function getNormalizedRouteContent(sourcePath: string): Promise<string> {
  return normalizeMarkdown(await readRouteMarkdownContent(sourcePath))
}

async function resolveEntryTitle(
  entry: RouteEntry,
  section: Section
): Promise<string> {
  const overrideTitle = TITLE_OVERRIDES[section][entry.path]
  if (overrideTitle) {
    return overrideTitle
  }
  const sourcePath = resolve(ROUTES_DIR, entry.importPath)
  const title = extractMarkdownTitle(
    await getNormalizedRouteContent(sourcePath)
  )
  if (!title) {
    throw new Error(
      `Cannot extract title for ${section}/${entry.path} from ${sourcePath}`
    )
  }
  return title
}

async function createIndexLines(
  entries: RouteEntry[],
  section: Section
): Promise<string[]> {
  return await Promise.all(
    entries.map(async (entry) => {
      const title = await resolveEntryTitle(entry, section)
      const url = createUrl(section, entry.path, true)
      return `- [${title}](${url})`
    })
  )
}

async function generateLlmsText(
  docEntries: RouteEntry[],
  componentEntries: RouteEntry[]
): Promise<string> {
  return `# Naive UI Documentation

> Official Naive UI documentation index for LLM-based tooling.

## Docs
${(await createIndexLines(docEntries, 'docs')).join('\n')}

## Components
${(await createIndexLines(componentEntries, 'components')).join('\n')}

## Optional
- [Full Snapshot (llms-full.txt)](/llms-full.txt)
- [Repository README](https://github.com/tusen-ai/naive-ui/blob/main/README.md)
- [Contributing Guide](https://github.com/tusen-ai/naive-ui/blob/main/CONTRIBUTING.md)
`
}

async function createFullSectionLines(
  entries: RouteEntry[],
  section: Section
): Promise<string[]> {
  const lines: string[] = []

  for (const entry of entries) {
    const sourcePath = resolve(ROUTES_DIR, entry.importPath)
    const content = await getNormalizedRouteContent(sourcePath)

    lines.push('---')
    lines.push(`url: ${createUrl(section, entry.path)}`)
    lines.push('---')
    lines.push('')

    if (content) {
      lines.push(content)
    }
    else {
      lines.push('_No markdown content extracted from source file._')
    }

    lines.push('')
  }

  return lines
}

async function generateLlmsFullText(
  docEntries: RouteEntry[],
  componentEntries: RouteEntry[]
): Promise<string> {
  const docSectionLines = await createFullSectionLines(docEntries, 'docs')
  const componentSectionLines = await createFullSectionLines(
    componentEntries,
    'components'
  )
  const lines = [...docSectionLines, ...componentSectionLines, '']

  return lines.join('\n')
}

async function main(): Promise<void> {
  const routesModule = await loadRoutesModule()

  const docEntries = toRouteEntries(routesModule.enDocRoutes)
  const componentEntries = toRouteEntries(routesModule.enComponentRoutes)
  const llmsContent = await generateLlmsText(docEntries, componentEntries)
  const llmsFullContent = await generateLlmsFullText(
    docEntries,
    componentEntries
  )

  await mkdir(resolve(cwd(), 'public'), { recursive: true })
  await writeFile(OUTPUT_FILE, llmsContent, 'utf-8')
  await writeFile(FULL_OUTPUT_FILE, llmsFullContent, 'utf-8')

  for (const [section, entries] of [
    ['docs', docEntries],
    ['components', componentEntries]
  ] as const) {
    for (const entry of entries) {
      const sourcePath = resolve(ROUTES_DIR, entry.importPath)
      const content = await getNormalizedRouteContent(sourcePath)
      const routeMarkdownFile = resolve(
        cwd(),
        'public',
        DEFAULT_LOCALE,
        DEFAULT_THEME,
        section,
        `${entry.path}.md`
      )
      await mkdir(dirname(routeMarkdownFile), { recursive: true })
      await writeFile(
        routeMarkdownFile,
        content || '_No markdown content extracted from source file._',
        'utf-8'
      )
    }
  }

  console.log(`Generated ${OUTPUT_FILE}`)
  console.log(`Generated ${FULL_OUTPUT_FILE}`)
}

main().catch((error) => {
  console.error(error)
  exit(1)
})

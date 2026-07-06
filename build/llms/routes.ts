import type { SgNode } from '@ast-grep/napi'
import type {
  Category,
  Locale,
  RouteEntries,
  RouteEntry,
  RouteManifest,
  SkippedRouteEntry
} from './types'
import fs from 'node:fs'
import path from 'node:path'
import { Lang, parse as parseAst } from '@ast-grep/napi'
import { parse as parseSfc } from '@vue/compiler-sfc'
import { SKIP_ROUTES } from './constants'

async function getRouteManifest(projectRoot: string): Promise<RouteManifest> {
  const routesPath = path.resolve(projectRoot, 'demo/routes/routes.js')
  const code = await fs.promises.readFile(routesPath, 'utf-8')
  const root = parseAst(Lang.JavaScript, code).root()

  const routeArrays: RouteEntries[] = [
    { name: 'enDocRoutes', category: 'docs', locale: 'en-US' },
    { name: 'zhDocRoutes', category: 'docs', locale: 'zh-CN' },
    { name: 'enComponentRoutes', category: 'components', locale: 'en-US' },
    { name: 'zhComponentRoutes', category: 'components', locale: 'zh-CN' }
  ]

  const entries: RouteEntry[] = []
  const skippedRoutes: SkippedRouteEntry[] = []

  for (const { name, category, locale } of routeArrays) {
    const exportNode = root.find({
      rule: { pattern: `export const ${name} = [$$$ITEMS]` }
    })
    if (!exportNode)
      continue

    const matches = exportNode.findAll({
      rule: { pattern: '{ path: $PATH, component: $COMP }' }
    })

    for (const match of matches) {
      const entry = parseRouteNode(match, projectRoot, category, locale)
      if (entry) {
        entries.push(entry)
      }
    }
  }

  const routes = await Promise.all(
    entries.map(async (route) => {
      if (!route.filePath.endsWith('.vue'))
        return route
      const mdPath = await extractMdPath(route.filePath)
      if (mdPath)
        return { ...route, filePath: mdPath }
      skippedRoutes.push({
        ...route,
        reason: 'Vue route does not import a markdown file'
      })
      return null
    })
  ).then(results => results.filter((r): r is RouteEntry => r !== null))

  return { routes, skippedRoutes }
}

async function getRoutes(projectRoot: string): Promise<RouteEntry[]> {
  return (await getRouteManifest(projectRoot)).routes
}

function parseRouteNode(
  match: SgNode,
  projectRoot: string,
  category: Category,
  locale: Locale
): RouteEntry | null {
  const routePath = match.getMatch('PATH')?.text().slice(1, -1)
  if (!routePath || SKIP_ROUTES.has(routePath))
    return null

  const importSource = match
    .getMatch('COMP')
    ?.find({ rule: { pattern: 'import($SOURCE)' } })
    ?.getMatch('SOURCE')
    ?.text()
    .slice(1, -1)
  if (!importSource)
    return null

  const filePath = path.resolve(projectRoot, 'demo/routes', importSource)
  return { routePath, filePath, category, locale }
}

async function extractMdPath(vuePath: string): Promise<string | null> {
  try {
    await fs.promises.access(vuePath)
    const content = await fs.promises.readFile(vuePath, 'utf-8')
    const { descriptor } = parseSfc(content, { filename: vuePath })
    const scripts = [
      descriptor.script?.content,
      descriptor.scriptSetup?.content
    ].filter((code): code is string => Boolean(code))

    for (const script of scripts) {
      const source = extractMarkdownImportSource(script)
      if (source)
        return path.resolve(path.dirname(vuePath), source)
    }

    return null
  }
  catch {
    return null
  }
}

function extractMarkdownImportSource(code: string): string | null {
  try {
    const root = parseAst(Lang.JavaScript, code).root()
    const importNodes = root.findAll({
      rule: { pattern: 'import $NAME from $SOURCE' }
    })

    for (const importNode of importNodes) {
      const source = importNode.getMatch('SOURCE')?.text().slice(1, -1)
      if (source?.endsWith('.md'))
        return source
    }
  }
  catch {
    // Vue SFCs in the docs are expected to use simple static imports. If the
    // parser rejects future script syntax, fall through to the conservative
    // import-source scan below instead of dropping the whole route.
  }

  const match = code.match(/\bimport\s+[^'"]+\s+from\s+['"]([^'"]+\.md)['"]/)
  return match?.[1] ?? null
}

function findRoute(
  routes: RouteEntry[],
  locale: Locale,
  category: Category,
  slug: string
): RouteEntry | null {
  const entry = routes.find(
    r =>
      r.routePath === slug && r.locale === locale && r.category === category
  )
  return entry ?? null
}

async function resolveRoute(
  projectRoot: string,
  locale: Locale,
  category: Category,
  slug: string
): Promise<RouteEntry | null> {
  return findRoute(await getRoutes(projectRoot), locale, category, slug)
}

async function resolveSourceMd(
  projectRoot: string,
  locale: Locale,
  category: Category,
  slug: string
): Promise<string | null> {
  return (
    (await resolveRoute(projectRoot, locale, category, slug))?.filePath ?? null
  )
}

export {
  extractMarkdownImportSource,
  extractMdPath,
  findRoute,
  getRouteManifest,
  getRoutes,
  parseRouteNode,
  resolveRoute,
  resolveSourceMd
}

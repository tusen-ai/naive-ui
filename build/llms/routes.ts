import type { SgNode } from '@ast-grep/napi'
import type { Category, Locale, RouteEntries, RouteEntry } from './types'
import fs from 'node:fs'
import path from 'node:path'
import { Lang, parse } from '@ast-grep/napi'
import { SKIP_ROUTES } from './constants'

async function getRoutes(projectRoot: string): Promise<RouteEntry[]> {
  const routesPath = path.resolve(projectRoot, 'demo/routes/routes.js')
  const code = await fs.promises.readFile(routesPath, 'utf-8')
  const root = parse(Lang.JavaScript, code).root()

  const routeArrays: RouteEntries[] = [
    { name: 'enDocRoutes', category: 'docs', locale: 'en-US' },
    { name: 'zhDocRoutes', category: 'docs', locale: 'zh-CN' },
    { name: 'enComponentRoutes', category: 'components', locale: 'en-US' },
    { name: 'zhComponentRoutes', category: 'components', locale: 'zh-CN' }
  ]

  const entries: RouteEntry[] = []

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
      if (entry)
        entries.push(entry)
    }
  }

  const routes = await Promise.all(
    entries.map(async (route) => {
      if (!route.filePath.endsWith('.vue'))
        return route
      const mdPath = await extractMdPath(route.filePath)
      return mdPath ? { ...route, filePath: mdPath } : null
    })
  ).then(results => results.filter((r): r is RouteEntry => r !== null))

  return routes
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

    const root = parse(Lang.JavaScript, content).root()
    const importNode = root.find({
      rule: { pattern: 'import $NAME from $SOURCE' }
    })
    if (!importNode)
      return null

    const source = importNode.getMatch('SOURCE')?.text().slice(1, -1)
    if (!source?.endsWith('.md'))
      return null

    return path.resolve(path.dirname(vuePath), source)
  }
  catch {
    return null
  }
}

async function resolveSourceMd(
  projectRoot: string,
  locale: Locale,
  category: Category,
  slug: string
): Promise<string | null> {
  const routes = await getRoutes(projectRoot)

  const entry = routes.find(
    r =>
      r.routePath === slug && r.locale === locale && r.category === category
  )
  return entry?.filePath ?? null
}

export { extractMdPath, getRoutes, parseRouteNode, resolveSourceMd }

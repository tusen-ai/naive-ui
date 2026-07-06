import type { Link, Root } from 'mdast'
import type { RouteEntry } from '../../llms/types'
import path from 'node:path'
import { visit } from 'unist-util-visit'

export interface RemarkNormalizeLlmsLinksOptions {
  route: RouteEntry
  routes: RouteEntry[]
  onWarn?: (message: string) => void
}

const categories = new Set(['docs', 'components'])
const locales = new Set(['en-US', 'zh-CN'])
const themes = new Set(['light', 'dark', 'os-theme'])
const externalProtocolRE = /^[a-z][a-z\d+.-]*:/i

function splitUrl(url: string): {
  pathname: string
  suffix: string
} {
  const hashIndex = url.indexOf('#')
  const queryIndex = url.indexOf('?')
  const suffixIndex = [hashIndex, queryIndex]
    .filter(index => index >= 0)
    .sort((a, b) => a - b)[0]

  if (suffixIndex == null)
    return { pathname: url, suffix: '' }

  return {
    pathname: url.slice(0, suffixIndex),
    suffix: url.slice(suffixIndex)
  }
}

function stripKnownSitePrefix(
  segments: string[],
  locale: RouteEntry['locale']
): { locale: RouteEntry['locale'], segments: string[] } {
  const next = [...segments]
  let targetLocale = locale
  if (locales.has(next[0])) {
    targetLocale = next.shift() as RouteEntry['locale']
  }
  if (themes.has(next[0]))
    next.shift()
  return { locale: targetLocale, segments: next }
}

function routeKey(
  locale: RouteEntry['locale'],
  category: RouteEntry['category'],
  routePath: string
): string {
  return `${locale}/${category}/${routePath}`
}

function normalizePathname(
  pathname: string,
  currentRoute: RouteEntry
): {
  locale: RouteEntry['locale']
  category: RouteEntry['category']
  routePath: string
} | null {
  if (!pathname || pathname === '.')
    return null

  let normalized: string
  let locale = currentRoute.locale
  if (pathname.startsWith('/')) {
    const stripped = stripKnownSitePrefix(
      pathname.split('/').filter(Boolean),
      currentRoute.locale
    )
    locale = stripped.locale
    normalized = `/${stripped.segments.join('/')}`
  }
  else {
    normalized = path.posix.normalize(
      path.posix.join('/', currentRoute.category, pathname)
    )
  }

  const [category, ...routePathParts] = normalized.split('/').filter(Boolean)
  if (!categories.has(category) || routePathParts.length === 0)
    return null

  const routePath = routePathParts
    .join('/')
    .replace(/\.md$/, '')
    .replace(/\/$/, '')

  return {
    locale,
    category: category as RouteEntry['category'],
    routePath
  }
}

function normalizeUrl(
  url: string,
  currentRoute: RouteEntry,
  routeSet: Set<string>,
  onWarn?: (message: string) => void
): string {
  if (
    !url
    || url.startsWith('#')
    || url.startsWith('{')
    || externalProtocolRE.test(url)
  ) {
    return url
  }

  const { pathname, suffix } = splitUrl(url)
  const normalized = normalizePathname(pathname, currentRoute)
  if (!normalized)
    return url

  const key = routeKey(
    normalized.locale,
    normalized.category,
    normalized.routePath
  )

  if (!routeSet.has(key)) {
    onWarn?.(
      `[naive-ui-llms-txt] Unresolved internal link "${url}" in ${routeKey(
        currentRoute.locale,
        currentRoute.category,
        currentRoute.routePath
      )}`
    )
    return url
  }

  return `/${normalized.locale}/${normalized.category}/${normalized.routePath}.md${suffix}`
}

export function remarkNormalizeLlmsLinks({
  route,
  routes,
  onWarn
}: RemarkNormalizeLlmsLinksOptions) {
  const routeSet = new Set(
    routes.map(r => routeKey(r.locale, r.category, r.routePath))
  )

  return (tree: Root) => {
    visit(tree, 'link', (node: Link) => {
      node.url = normalizeUrl(node.url, route, routeSet, onWarn)
    })
  }
}

export type Category = 'docs' | 'components'
export type Locale = 'en-US' | 'zh-CN'
export type Theme = 'light' | 'dark' | 'os-theme'

export type LlmsAction
  = | { type: 'llms-txt', locale: Locale }
    | { type: 'llms-full-txt', locale: Locale }
    | { type: 'md', locale: Locale, category: Category, slug: string }

export interface RouteEntry {
  routePath: string
  filePath: string
  category: Category
  locale: Locale
}

export interface RouteEntries {
  name: string
  category: Category
  locale: Locale
}

export interface ProcessedDoc {
  route: RouteEntry
  title: string
  content: string
}

export interface LlmsLogger {
  info: (message: string) => void
  warn: (message: string, error?: unknown) => void
}

import { NaiveDateLocale, NaiveLocale } from '../../locales'

type Hljs = any
type Theme = any
type ThemeOverrides = any

export interface ConfigProviderInjection {
  mergedBordered: boolean | undefined
  mergedNamespace: string | undefined
  mergedLocale: NaiveLocale | undefined
  mergedDateLocale: NaiveDateLocale | undefined
  mergedHljs: Hljs | undefined
  // wip, unstable
  mergedUnstableTheme: Theme | undefined
  mergedUnstableThemeOverrides: ThemeOverrides | undefined
  // deprecated
  mergedTheme: string | undefined
  mergedLanguage: string | undefined
  mergedThemeEnvironments: any | undefined
}

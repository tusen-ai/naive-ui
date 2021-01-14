import { reactive } from 'vue'

export type NaiveLocale = any
export type NaiveDateLocale = any
export type Hljs = any
export type Theme = any
export type ThemeOverrides = any

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

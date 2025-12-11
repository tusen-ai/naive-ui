import type { NLocale } from '../common/enUS'
import { merge } from 'es-toolkit/compat'

export type NPartialLocale = {
  [key in keyof NLocale]+?: {
    [childKey in keyof NLocale[key]]+?: NLocale[key][childKey]
  }
}

export function createLocale(locale: NLocale): NLocale
export function createLocale(
  locale: NPartialLocale,
  fallbackLocale: NLocale
): NLocale
export function createLocale(
  locale: NPartialLocale,
  fallbackLocale?: NLocale
): NLocale {
  return merge({}, fallbackLocale, locale)
}

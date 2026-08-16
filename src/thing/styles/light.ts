import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'

export function self(vars: ThemeCommonVars) {
  const { textColor1, textColor2, fontWeightStrong, fontSize } = vars
  return {
    fontSize,
    titleTextColor: textColor1,
    textColor: textColor2,
    titleFontWeight: fontWeightStrong
  }
}

export interface ThingThemeVars extends ReturnType<typeof self> {}

const thingLight: ThingTheme = {
  name: 'Thing',
  common: commonLight,
  self
}

export interface ThingTheme extends Theme<'Thing', ThingThemeVars> {}

export interface ThingThemeOverrides extends ExtractThemeOverrides<ThingTheme> {}

export default thingLight

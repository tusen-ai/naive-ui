import type { Theme } from '../../_mixins'
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

export type ThingThemeVars = ReturnType<typeof self>

const thingLight: Theme<'Thing', ThingThemeVars> = {
  name: 'Thing',
  common: commonLight,
  self
}

export default thingLight
export type ThingTheme = typeof thingLight

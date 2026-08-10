import type { ExtractThemeOverrides, Theme } from '../../../_mixins'
import type { ThemeCommonVars } from '../../../_styles/common'
import { commonLight } from '../../../_styles/common'
import { commonVars } from './common'

export function self(vars: ThemeCommonVars) {
  const {
    scrollbarColor,
    scrollbarColorHover,
    scrollbarHeight,
    scrollbarWidth,
    scrollbarBorderRadius
  } = vars
  return {
    ...commonVars,
    height: scrollbarHeight,
    width: scrollbarWidth,
    borderRadius: scrollbarBorderRadius,
    color: scrollbarColor,
    colorHover: scrollbarColorHover
  }
}

export interface ScrollbarThemeVars extends ReturnType<typeof self> {}

const scrollbarLight: ScrollbarTheme = {
  name: 'Scrollbar',
  common: commonLight,
  self
}

export interface ScrollbarTheme extends Theme<
  'Scrollbar',
  ScrollbarThemeVars
> {}

export interface ScrollbarThemeOverrides extends ExtractThemeOverrides<ScrollbarTheme> {}

export default scrollbarLight

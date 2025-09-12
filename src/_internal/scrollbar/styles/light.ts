import type { Theme } from '../../../_mixins'
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

export type ScrollbarThemeVars = ReturnType<typeof self>

const scrollbarLight: Theme<'Scrollbar', ScrollbarThemeVars> = {
  name: 'Scrollbar',
  common: commonLight,
  self
}

export default scrollbarLight
export type ScrollbarTheme = typeof scrollbarLight

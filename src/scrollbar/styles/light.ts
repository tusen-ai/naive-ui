import { commonLight } from '../../_styles/new-common'
import type { ThemeCommonVars } from '../../_styles/new-common'
import type { Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const { scrollbarColorOverlay, scrollbarColorHoverOverlay } = vars
  return {
    color: scrollbarColorOverlay,
    colorHover: scrollbarColorHoverOverlay
  }
}

export type ScrollbarThemeVars = ReturnType<typeof self>

const scrollbarLight: Theme<ScrollbarThemeVars> = {
  name: 'Scrollbar',
  common: commonLight,
  self
}

export default scrollbarLight
export type ScrollbarTheme = typeof scrollbarLight

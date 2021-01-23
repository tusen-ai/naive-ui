import { composite } from 'seemly'
import { commonLight } from '../../_styles/new-common'
import type { ThemeCommonVars } from '../../_styles/new-common'
import { scrollbarLight } from '../../scrollbar/styles'
import { createTheme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const {
    textColor2,
    bodyColor,
    cardColor,
    dividerColorOverlay,
    scrollbarColorOverlay,
    scrollbarColorHoverOverlay
  } = vars
  return {
    textColor: textColor2,
    color: bodyColor,
    headerColor: cardColor,
    headerBorderColor: dividerColorOverlay,
    footerBorderColor: dividerColorOverlay,
    siderBorderColor: dividerColorOverlay,
    siderColor: cardColor,
    siderToggleButtonColor: 'rgba(0, 0, 0, .15)',
    siderToggleBarColor: composite(bodyColor, scrollbarColorOverlay),
    siderToggleBarColorHover: composite(bodyColor, scrollbarColorHoverOverlay)
  }
}

export type LayoutThemeVars = ReturnType<typeof self>

const layoutLight = createTheme({
  name: 'Layout',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight
  },
  self
})

export default layoutLight
export type LayoutTheme = typeof layoutLight

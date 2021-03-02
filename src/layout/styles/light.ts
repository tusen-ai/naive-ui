import { composite } from 'seemly'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { scrollbarLight } from '../../scrollbar/styles'
import { createTheme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const {
    textColor2,
    bodyColor,
    cardColor,
    dividerColor,
    scrollbarColor,
    scrollbarColorHover
  } = vars
  return {
    textColor: textColor2,
    color: bodyColor,
    headerColor: cardColor,
    headerBorderColor: dividerColor,
    footerBorderColor: dividerColor,
    siderBorderColor: dividerColor,
    siderColor: cardColor,
    siderToggleButtonColor: 'rgba(0, 0, 0, .15)',
    siderToggleBarColor: composite(bodyColor, scrollbarColor),
    siderToggleBarColorHover: composite(bodyColor, scrollbarColorHover)
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

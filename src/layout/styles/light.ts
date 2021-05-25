import { composite } from 'seemly'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { scrollbarLight } from '../../scrollbar/styles'
import { createTheme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const {
    textColor2,
    bodyColor,
    cardColor,
    dividerColor,
    actionColor,
    scrollbarColor,
    scrollbarColorHover,
    invertedColor
  } = vars
  return {
    textColor: textColor2,
    textColorInverted: '#FFF',
    color: bodyColor,
    headerColor: cardColor,
    headerColorInverted: invertedColor,
    footerColor: actionColor,
    footerColorInverted: invertedColor,
    headerBorderColor: dividerColor,
    headerBorderColorInverted: invertedColor,
    footerBorderColor: dividerColor,
    footerBorderColorInverted: invertedColor,
    siderBorderColor: dividerColor,
    siderBorderColorInverted: invertedColor,
    siderColor: cardColor,
    siderColorInverted: invertedColor,
    siderToggleButtonColor: 'rgba(0, 0, 0, .15)',
    siderToggleBarColor: composite(bodyColor, scrollbarColor),
    siderToggleBarColorHover: composite(bodyColor, scrollbarColorHover),
    __invertScrollbar: 'true'
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

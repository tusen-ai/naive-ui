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
    colorEmbedded: actionColor,
    headerColor: cardColor,
    headerColorInverted: invertedColor,
    footerColor: actionColor,
    footerColorInverted: invertedColor,
    headerBorderColor: dividerColor,
    headerBorderColorInverted: invertedColor,
    footerBorderColor: dividerColor,
    footerBorderColorInverted: invertedColor,
    asideBorderColor: dividerColor,
    asideBorderColorInverted: invertedColor,
    asideColor: cardColor,
    asideColorInverted: invertedColor,
    asideToggleButtonColor: 'rgba(0, 0, 0, .15)',
    asideToggleBarColor: composite(bodyColor, scrollbarColor),
    asideToggleBarColorHover: composite(bodyColor, scrollbarColorHover),
    // hack for inverted background
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

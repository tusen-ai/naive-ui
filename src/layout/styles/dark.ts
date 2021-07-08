import { commonDark } from '../../_styles/common'
import { scrollbarDark } from '../../scrollbar/styles'
import type { LayoutTheme } from './light'
import { composite } from 'seemly'

const layoutDark: LayoutTheme = {
  name: 'Layout',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark
  },
  self (vars) {
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
      textColorInverted: textColor2,
      color: bodyColor,
      colorEmbedded: bodyColor,
      headerColor: cardColor,
      headerColorInverted: cardColor,
      footerColor: cardColor,
      footerColorInverted: cardColor,
      headerBorderColor: dividerColor,
      headerBorderColorInverted: dividerColor,
      footerBorderColor: dividerColor,
      footerBorderColorInverted: dividerColor,
      asideBorderColor: dividerColor,
      asideBorderColorInverted: dividerColor,
      asideColor: cardColor,
      asideColorInverted: cardColor,
      asideToggleButtonColor: 'rgba(255, 255, 255, .3)',
      asideToggleBarColor: composite(bodyColor, scrollbarColor),
      asideToggleBarColorHover: composite(bodyColor, scrollbarColorHover),
      __invertScrollbar: 'false'
    }
  }
}

export default layoutDark

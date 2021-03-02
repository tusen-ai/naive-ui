import { composite } from 'seemly'
import { commonDark } from '../../_styles/common'
import { scrollbarDark } from '../../scrollbar/styles'
import type { LayoutTheme } from './light'

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
      color: bodyColor,
      headerColor: cardColor,
      headerBorderColor: dividerColor,
      footerBorderColor: dividerColor,
      siderBorderColor: dividerColor,
      siderColor: cardColor,
      siderToggleButtonColor: 'rgba(255, 255, 255, .3)',
      siderToggleBarColor: composite(bodyColor, scrollbarColor),
      siderToggleBarColorHover: composite(bodyColor, scrollbarColorHover)
    }
  }
}

export default layoutDark

import { composite } from 'seemly'
import { commonDark } from '../../_styles/new-common'
import { scrollbarDark } from '../../scrollbar/styles'

export default {
  name: 'Layout',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark
  },
  self (vars) {
    const {
      textColor2Overlay,
      bodyColor,
      cardColor,
      dividerColorOverlay,
      scrollbarColorOverlay,
      scrollbarColorHoverOverlay
    } = vars
    return {
      textColor: textColor2Overlay,
      color: bodyColor,
      headerColor: cardColor,
      headerBorderColor: dividerColorOverlay,
      footerBorderColor: dividerColorOverlay,
      siderBorderColor: dividerColorOverlay,
      siderColor: cardColor,
      siderToggleButtonColor: 'rgba(255, 255, 255, .3)',
      siderToggleBarColor: composite(bodyColor, scrollbarColorOverlay),
      siderToggleBarColorHover: composite(bodyColor, scrollbarColorHoverOverlay)
    }
  }
}

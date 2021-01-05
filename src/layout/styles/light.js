import { composite } from 'seemly'
import { commonLight } from '../../_styles/new-common'
import { scrollbarLight } from '../../scrollbar/styles'

export default {
  name: 'Layout',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight
  },
  self (vars) {
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
}

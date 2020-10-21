import create from '../../_styles/utils/create-component-base'
import { composite } from '../../_utils/color/index'

export default create({
  name: 'Layout',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      textColor2Overlay,
      bodyColor,
      cardColor,
      dividerColorOverlay,
      scrollbarColorOverlay,
      scrollbarColorHoverOverlay
    } = derived
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
})

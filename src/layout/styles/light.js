import create from '../../_styles/utils/create-component-base'
import { composite } from '../../_utils/color/index'

export default create({
  name: 'Layout',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      textColorSecondary,
      bodyColor,
      cardColor,
      dividerColorOverlay,
      scrollbarColorOverlay,
      scrollbarColorHoverOverlay
    } = derived
    return {
      textColor: textColorSecondary,
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
})

import create from '../../styles/_utils/create-component-base'
import { composite } from '../../_utils/color/index'

export default create({
  name: 'Layout',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextColor,
      bodyBackgroundColor,
      cardBackgroundColor,
      dividerOverlayColor,
      scrollbarBackgroundOverlayColor,
      scrollbarHoverBackgroundOverlayColor
    } = derived
    return {
      textColor: secondaryTextColor,
      color: bodyBackgroundColor,
      headerColor: cardBackgroundColor,
      headerBorderColor: dividerOverlayColor,
      footerBorderColor: dividerOverlayColor,
      siderBorderColor: dividerOverlayColor,
      siderColor: cardBackgroundColor,
      siderToggleButtonColor: 'rgba(0, 0, 0, .15)',
      siderToggleBarColor: composite(bodyBackgroundColor, scrollbarBackgroundOverlayColor),
      siderToggleBarColorHover: composite(bodyBackgroundColor, scrollbarHoverBackgroundOverlayColor)
    }
  }
})

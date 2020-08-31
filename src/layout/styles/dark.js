import create from '../../styles/_utils/create-component-base'
import { composite } from '../../_utils/color/index'

export default create({
  name: 'Layout',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextOverlayColor,
      bodyBackgroundColor,
      cardBackgroundColor,
      dividerOverlayColor,
      scrollbarBackgroundOverlayColor,
      scrollbarHoverBackgroundOverlayColor
    } = derived
    return {
      textColor: secondaryTextOverlayColor,
      color: bodyBackgroundColor,
      headerColor: cardBackgroundColor,
      headerBorderColor: dividerOverlayColor,
      footerBorderColor: dividerOverlayColor,
      siderBorderColor: dividerOverlayColor,
      siderColor: cardBackgroundColor,
      siderToggleButtonColor: 'rgba(255, 255, 255, .3)',
      siderToggleBarColor: composite(bodyBackgroundColor, scrollbarBackgroundOverlayColor),
      siderToggleBarColorHover: composite(bodyBackgroundColor, scrollbarHoverBackgroundOverlayColor)
    }
  }
})

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
    const {
      borderRadius
    } = base
    return {
      borderRadius,
      textColor: secondaryTextColor,
      color: bodyBackgroundColor,
      headerBackgroundColor: cardBackgroundColor,
      headerBorderColor: dividerOverlayColor,
      footerBorderColor: dividerOverlayColor,
      siderBorderColor: dividerOverlayColor,
      siderBackgroundColor: cardBackgroundColor,
      siderToggleButtonFill: 'rgba(0, 0, 0, .15)',
      siderToggleBarBackgroundColor: {
        default: composite(bodyBackgroundColor, scrollbarBackgroundOverlayColor),
        hover: composite(bodyBackgroundColor, scrollbarHoverBackgroundOverlayColor)
      }
    }
  }
})

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
    const {
      borderRadius
    } = base
    return {
      borderRadius,
      textColor: secondaryTextOverlayColor,
      color: bodyBackgroundColor,
      headerBackgroundColor: cardBackgroundColor,
      headerBorderColor: dividerOverlayColor,
      footerBorderColor: dividerOverlayColor,
      siderBorderColor: dividerOverlayColor,
      siderBackgroundColor: cardBackgroundColor,
      siderToggleButtonFill: 'rgba(255, 255, 255, .3)',
      siderToggleBarBackgroundColor: {
        default: composite(bodyBackgroundColor, scrollbarBackgroundOverlayColor),
        hover: composite(bodyBackgroundColor, scrollbarHoverBackgroundOverlayColor)
      }
    }
  }
})

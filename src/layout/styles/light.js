import create from '../../_styles/utils/create-component-base'
import { composite } from 'seemly'

export default create({
  name: 'Layout',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      textColor2,
      bodyColor,
      cardColor,
      dividerColorOverlay,
      scrollbarColorOverlay,
      scrollbarColorHoverOverlay
    } = derived
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
})

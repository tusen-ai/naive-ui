import create from '../../_styles/utils/create-component-base'
import { composite } from 'seemly'

export default create({
  name: 'Layout',
  theme: 'dark',
  getDerivedVars (vars) {
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
})

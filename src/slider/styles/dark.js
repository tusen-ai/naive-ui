import create from '../../_styles/utils/create-component-base'
import { composite, changeColor } from '../../_utils/color/index.js'
import sizeVariables from './_common'

export default create({
  name: 'Slider',
  theme: 'dark',
  getDerivedVariables ({ base, derived }) {
    const boxShadow = '0 2px 8px 0 rgba(0, 0, 0, 0.12)'
    const {
      railColorOverlay,
      railColorHoverOverlay,
      cardColor,
      primaryColor,
      popoverColor,
      textColorSecondaryOverlay
    } = derived
    const {
      borderRadius
    } = base
    const defaultFillColor = composite(cardColor, changeColor(primaryColor, { alpha: 0.7 }))
    return {
      ...sizeVariables,
      // defaultFillColor: defaultFillColor,
      railColor: railColorOverlay,
      railColorHover: railColorHoverOverlay,
      railFillColor: defaultFillColor,
      railFillColorHover: primaryColor,
      handleColor: cardColor,
      handleBoxShadow: `inset 0 0 0 2px ${defaultFillColor}`,
      handleBoxShadowHover: `inset 0 0 0 2px ${primaryColor}`,
      handleBoxShadowActive: `inset 0 0 0 2px ${primaryColor}, 0 0 0 3px ${changeColor(primaryColor, { alpha: 0.2 })}`,
      handleBoxShadowFocus: `inset 0 0 0 2px ${primaryColor}, 0 0 0 3px ${changeColor(primaryColor, { alpha: 0.2 })}`,
      indicatorColor: popoverColor,
      indicatorBoxShadow: boxShadow,
      indicatorTextColor: textColorSecondaryOverlay,
      indicatorBorderRadius: borderRadius,
      dotBoxShadow: `inset 0 0 0 2px ${defaultFillColor}`,
      dotBoxShadowActive: `inset 0 0 0 2px ${primaryColor}`
    }
  }
})

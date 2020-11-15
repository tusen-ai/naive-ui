
import create from '../../_styles/utils/create-component-base'
import { changeColor } from '../../_utils/color/index.js'
import sizeVariables from './_common'

export default create({
  name: 'Slider',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const indicatorColor = 'rgba(0, 0, 0, .85)'
    const boxShadow = '0 2px 8px 0 rgba(0, 0, 0, 0.12)'
    const {
      railColorOverlay,
      railColorHoverOverlay,
      primaryColor,
      primaryColorHover,
      baseColor
    } = derived
    const {
      borderRadius
    } = base
    return {
      ...sizeVariables,
      railColor: railColorOverlay,
      railColorHover: railColorHoverOverlay,
      railFillColor: primaryColor,
      railFillColorHover: primaryColorHover,
      handleColor: baseColor,
      handleColorModal: baseColor,
      handleBoxShadow: `inset 0 0 0 2px ${primaryColor}`,
      handleBoxShadowHover: `inset 0 0 0 2px ${primaryColorHover}`,
      handleBoxShadowActive: `inset 0 0 0 2px ${primaryColorHover}, 0 0 0 3px ${changeColor(primaryColor, { alpha: 0.2 })}`,
      handleBoxShadowFocus: `inset 0 0 0 2px ${primaryColorHover}, 0 0 0 3px ${changeColor(primaryColor, { alpha: 0.2 })}`,
      indicatorColor: indicatorColor,
      indicatorBoxShadow: boxShadow,
      indicatorTextColor: baseColor,
      indicatorBorderRadius: borderRadius,
      dotBoxShadow: `inset 0 0 0 2px ${primaryColor}`,
      dotBoxShadowActive: `inset 0 0 0 2px ${primaryColorHover}`
    }
  }
})

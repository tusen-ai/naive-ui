
import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color/index.js'
import sizeVariables from './_common'

export default create({
  name: 'Slider',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const indicatorColor = 'rgba(0, 0, 0, .85)'
    const boxShadow = '0 2px 8px 0 rgba(0, 0, 0, 0.12)'
    const {
      railBackgroundOverlayColor,
      railHoverBackgroundOverlayColor,
      primaryColor,
      primaryHoverColor,
      baseBackgroundColor
    } = derived
    return {
      ...sizeVariables,
      railColor: railBackgroundOverlayColor,
      railColorHover: railHoverBackgroundOverlayColor,
      railFillColor: primaryColor,
      railFillColorHover: primaryHoverColor,
      handleColor: baseBackgroundColor,
      handleBoxShadow: `inset 0 0 0 2px ${primaryColor}`,
      handleBoxShadowHover: `inset 0 0 0 2px ${primaryHoverColor}`,
      handleBoxShadowActive: `inset 0 0 0 2px ${primaryHoverColor}, 0 0 0 3px ${changeColor(primaryColor, { alpha: 0.2 })}`,
      handleBoxShadowFocus: `inset 0 0 0 2px ${primaryHoverColor}, 0 0 0 3px ${changeColor(primaryColor, { alpha: 0.2 })}`,
      indicatorColor: indicatorColor,
      indicatorBoxShadow: boxShadow,
      indicatorTextColor: baseBackgroundColor,
      dotBoxShadow: `inset 0 0 0 2px ${primaryColor}`,
      dotBoxShadowActive: `inset 0 0 0 2px ${primaryHoverColor}`
    }
  }
})

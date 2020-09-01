
import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color/index.js'
import sizeVariables from './_common'

export default create({
  name: 'Slider',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const indicatorBackgroundColor = 'rgba(0, 0, 0, .85)'
    const boxShadow = '0 2px 8px 0 rgba(0, 0, 0, 0.12)'
    const {
      railBackgroundOverlayColor,
      railHoverBackgroundOverlayColor,
      primaryColor,
      primaryHoverColor,
      baseBackgroundColor
    } = derived
    const {
      transformDebounceScale
    } = base
    return {
      ...sizeVariables,
      railBackgroundColorDefault: railBackgroundOverlayColor,
      railBackgroundColorHover: railHoverBackgroundOverlayColor,
      railFillBackgroundColorDefault: primaryColor,
      railFillBackgroundColorHover: primaryHoverColor,
      handleBackgroundColor: baseBackgroundColor,
      handleBoxShadowDefault: `inset 0 0 0 2px ${primaryColor}`,
      handleBoxShadowHover: `inset 0 0 0 2px ${primaryHoverColor}`,
      handleBoxShadowActive: `inset 0 0 0 2px ${primaryHoverColor}, 0 0 0 3px ${changeColor(primaryColor, { alpha: 0.2 })}`,
      handleBoxShadowFocus: `inset 0 0 0 2px ${primaryHoverColor}, 0 0 0 3px ${changeColor(primaryColor, { alpha: 0.2 })}`,
      indicatorBackgroundColor: indicatorBackgroundColor,
      indicatorBoxShadow: boxShadow,
      indicatorTextColor: baseBackgroundColor,
      dotBoxShadowDefault: `inset 0 0 0 2px ${primaryColor}`,
      dotBoxShadowActive: `inset 0 0 0 2px ${primaryHoverColor}`,
      transformDebounceScale: transformDebounceScale
    }
  }
})

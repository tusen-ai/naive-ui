
import create from '../../_styles/utils/create-component-base'
import sizeVariables from './_common'

export default create({
  name: 'Slider',
  theme: 'light',
  getDerivedVars (vars) {
    const indicatorColor = 'rgba(0, 0, 0, .85)'
    const boxShadow = '0 2px 8px 0 rgba(0, 0, 0, 0.12)'
    const {
      railColorOverlay,
      primaryColor,
      baseColor,
      cardColor,
      borderRadius
    } = vars
    return {
      ...sizeVariables,
      railColor: railColorOverlay,
      railColorHover: railColorOverlay,
      fillColor: primaryColor,
      fillColorHover: primaryColor,
      handleColor: '#FFF',
      dotColor: cardColor,
      dotColorModal: baseColor,
      handleBoxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)',
      handleBoxShadowHover: '0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)',
      handleBoxShadowActive: '0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)',
      handleBoxShadowFocus: '0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)',
      indicatorColor: indicatorColor,
      indicatorBoxShadow: boxShadow,
      indicatorTextColor: baseColor,
      indicatorBorderRadius: borderRadius,
      dotBorder: `2px solid ${primaryColor}`,
      dotBoxShadow: null
    }
  }
})

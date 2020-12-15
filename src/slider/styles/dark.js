import create from '../../_styles/utils/create-component-base'
import sizeVariables from './_common'
import { baseDark } from '../../_styles/base'

export default create({
  name: 'Slider',
  theme: 'dark',
  peer: [baseDark],
  getLocalVars (vars) {
    const boxShadow = '0 2px 8px 0 rgba(0, 0, 0, 0.12)'
    const {
      railColorOverlay,
      modalColor,
      primaryColorSuppl,
      popoverColor,
      textColor2Overlay,
      cardColor,
      borderRadius,
      fontSize
    } = vars
    return {
      ...sizeVariables,
      fontSize,
      railColor: railColorOverlay,
      railColorHover: railColorOverlay,
      fillColor: primaryColorSuppl,
      fillColorHover: primaryColorSuppl,
      handleColor: '#FFF',
      dotColor: cardColor,
      dotColorModal: modalColor,
      handleBoxShadow: '0px 2px 4px 0 rgba(0, 0, 0, 0.4)',
      handleBoxShadowHover: '0px 2px 4px 0 rgba(0, 0, 0, 0.4)',
      handleBoxShadowActive: '0px 2px 4px 0 rgba(0, 0, 0, 0.4)',
      handleBoxShadowFocus: '0px 2px 4px 0 rgba(0, 0, 0, 0.4)',
      indicatorColor: popoverColor,
      indicatorBoxShadow: boxShadow,
      indicatorTextColor: textColor2Overlay,
      indicatorBorderRadius: borderRadius,
      dotBorder: `2px solid ${primaryColorSuppl}`,
      dotBoxShadow: null
    }
  }
})

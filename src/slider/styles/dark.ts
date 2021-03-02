import sizeVariables from './_common'
import { commonDark } from '../../_styles/common'
import type { SliderTheme } from './light'

const sliderDark: SliderTheme = {
  name: 'Slider',
  common: commonDark,
  self (vars) {
    const boxShadow = '0 2px 8px 0 rgba(0, 0, 0, 0.12)'
    const {
      railColor,
      modalColor,
      primaryColorSuppl,
      popoverColor,
      textColor2,
      cardColor,
      borderRadius,
      fontSize
    } = vars
    return {
      ...sizeVariables,
      fontSize,
      railColor: railColor,
      railColorHover: railColor,
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
      indicatorTextColor: textColor2,
      indicatorBorderRadius: borderRadius,
      dotBorder: `2px solid ${railColor}`,
      dotBorderActive: `2px solid ${primaryColorSuppl}`,
      dotBoxShadow: null
    }
  }
}

export default sliderDark

import { changeColor } from 'seemly'
import commonVariables from './_common'
import { commonDark } from '../../_styles/common'
import type { RadioTheme } from './light'

const radioDark: RadioTheme = {
  name: 'Radio',
  common: commonDark,
  self (vars) {
    const {
      borderColor,
      primaryColor,
      baseColor,
      textColorDisabled,
      inputColorDisabled,
      textColor2,
      opacityDisabled,
      borderRadius,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      heightSmall,
      heightMedium,
      heightLarge,
      lineHeight
    } = vars
    return {
      ...commonVariables,
      labelLineHeight: lineHeight,
      buttonHeightSmall: heightSmall,
      buttonHeightMedium: heightMedium,
      buttonHeightLarge: heightLarge,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      boxShadow: `inset 0 0 0 1px ${borderColor}`,
      boxShadowActive: `inset 0 0 0 1px ${primaryColor}`,
      boxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(
        primaryColor,
        { alpha: 0.3 }
      )}`,
      boxShadowHover: `inset 0 0 0 1px ${primaryColor}`,
      boxShadowDisabled: `inset 0 0 0 1px ${borderColor}`,
      color: '#0000',
      colorDisabled: inputColorDisabled,
      colorActive: '#0000',
      textColor: textColor2,
      textColorDisabled,
      dotColorActive: primaryColor,
      dotColorDisabled: borderColor,
      buttonBorderColor: borderColor,
      buttonBorderColorActive: primaryColor,
      buttonBorderColorHover: primaryColor,
      buttonColor: '#0000',
      buttonColorActive: primaryColor,
      buttonTextColor: textColor2,
      buttonTextColorActive: baseColor,
      buttonTextColorHover: primaryColor,
      opacityDisabled,
      buttonBoxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(
        primaryColor,
        { alpha: 0.3 }
      )}`,
      buttonBoxShadowHover: `inset 0 0 0 1px ${primaryColor}`,
      buttonBoxShadow: 'inset 0 0 0 1px #0000',
      buttonBorderRadius: borderRadius
    }
  }
}

export default radioDark

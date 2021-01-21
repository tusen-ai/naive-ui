import { changeColor } from 'seemly'
import commonVariables from './_common'
import { commonDark } from '../../_styles/new-common'
import type { RadioTheme } from './light'

const radioDark: RadioTheme = {
  name: 'Radio',
  common: commonDark,
  self (vars) {
    const {
      borderColorOverlay,
      primaryColor,
      baseColor,
      textColorDisabledOverlay,
      inputColorDisabledOverlay,
      textColor2Overlay,
      opacityDisabled,
      borderRadius,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      heightSmall,
      heightMedium,
      heightLarge
    } = vars
    return {
      ...commonVariables,
      buttonHeightSmall: heightSmall,
      buttonHeightMedium: heightMedium,
      buttonHeightLarge: heightLarge,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      boxShadow: `inset 0 0 0 1px ${borderColorOverlay}`,
      boxShadowActive: `inset 0 0 0 1px ${primaryColor}`,
      boxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(
        primaryColor,
        { alpha: 0.3 }
      )}`,
      boxShadowHover: `inset 0 0 0 1px ${primaryColor}`,
      boxShadowDisabled: `inset 0 0 0 1px ${borderColorOverlay}`,
      color: 'transparent',
      colorDisabled: inputColorDisabledOverlay,
      textColor: textColor2Overlay,
      textColorDisabled: textColorDisabledOverlay,
      dotColorActive: primaryColor,
      dotColorDisabled: borderColorOverlay,
      buttonBorderColor: borderColorOverlay,
      buttonBorderColorActive: primaryColor,
      buttonBorderColorHover: primaryColor,
      buttonColor: 'transparent',
      buttonColorActive: primaryColor,
      buttonTextColor: textColor2Overlay,
      buttonTextColorActive: baseColor,
      buttonTextColorHover: primaryColor,
      opacityDisabled: opacityDisabled,
      buttonBoxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(
        primaryColor,
        { alpha: 0.3 }
      )}`,
      buttonBoxShadowHover: `inset 0 0 0 1px ${primaryColor}`,
      buttonBoxShadow: 'inset 0 0 0 1px transparent',
      buttonBorderRadius: borderRadius
    }
  }
}

export default radioDark

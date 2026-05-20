import type { CheckboxTheme } from './light'
import { changeColor } from 'seemly'
import { commonDark } from '../../_styles/common'
import { self } from './light'

const checkboxDark: CheckboxTheme = {
  name: 'Checkbox',
  common: commonDark,
  self(vars) {
    const {
      borderColor,
      primaryColor,
      baseColor,
      textColor2,
      borderRadius,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      lineHeight,
      heightSmall,
      heightMedium,
      heightLarge,
      cardColor,
      opacityDisabled
    } = vars
    const commonSelf = self(vars)
    return {
      ...commonSelf,
      color: '#0000',
      checkMarkColor: cardColor,
      buttonColor: cardColor,
      buttonColorActive: primaryColor,
      buttonTextColor: textColor2,
      buttonTextColorActive: baseColor,
      buttonTextColorHover: primaryColor,
      buttonBorderColor: borderColor,
      buttonBorderColorActive: primaryColor,
      buttonBorderColorHover: borderColor,
      buttonBoxShadow: 'inset 0 0 0 1px #0000',
      buttonBoxShadowHover: 'inset 0 0 0 1px #0000',
      buttonBoxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(
        primaryColor,
        { alpha: 0.3 }
      )}`,
      buttonBorderRadius: borderRadius,
      labelLineHeight: lineHeight,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      buttonHeightSmall: heightSmall,
      buttonHeightMedium: heightMedium,
      buttonHeightLarge: heightLarge,
      opacityDisabled
    }
  }
}

export default checkboxDark

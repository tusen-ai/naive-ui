import { changeColor } from 'seemly'
import { commonDark } from '../../_styles/common'
import type { CheckboxTheme } from './light'
import { self } from './light'

const checkboxDark: CheckboxTheme = {
  name: 'Checkbox',
  common: commonDark,
  self (vars) {
    const {
      cardColor,
      baseColor,
      borderColor,
      primaryColor,
      textColor2,
      opacityDisabled,
      borderRadius,
      heightSmall,
      heightMedium,
      heightLarge
    } = vars
    const commonSelf = self(vars)
    commonSelf.color = '#0000'
    commonSelf.checkMarkColor = cardColor
    return {
      ...commonSelf,
      buttonHeightSmall: heightSmall,
      buttonHeightMedium: heightMedium,
      buttonHeightLarge: heightLarge,
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

export default checkboxDark

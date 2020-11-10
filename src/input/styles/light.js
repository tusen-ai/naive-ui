import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { changeColor } from '../../_utils/color/index'
import {
  baseSuffixLight
} from '../../styles'

export default create({
  name: 'Input',
  theme: 'light',
  peer: [
    baseSuffixLight
  ],
  getDerivedVariables ({ base, derived }) {
    const {
      textColor2,
      textColor4,
      textColor5,
      primaryColor,
      primaryColorHover,
      inputColor,
      inputColorDisabled,
      borderColor,
      warningColor,
      warningColorHover,
      errorColor,
      errorColorHover
    } = derived
    const {
      borderRadius
    } = base
    return {
      ...commonVariables,
      borderRadius,
      iconSize: '16px',
      textColor: textColor2,
      textColorDisabled: textColor4,
      caretColor: primaryColor,
      placeholderColor: textColor4,
      placeholderColorDisabled: textColor5,
      backgroundColor: inputColor,
      colorDisabled: inputColorDisabled,
      colorFocus: inputColor,
      borderColor: 'transparent',
      borderColorHover: primaryColorHover,
      borderColorDisabled: 'transparent !important',
      borderColorFocus: primaryColorHover,
      boxShadow: `inset 0 0 0 1px ${borderColor}`,
      boxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, { alpha: 0.2 })}`,
      boxShadowDisabled: `inset 0 0 0 1px ${borderColor}`,
      // warning
      borderColorWarning: warningColor,
      borderColorWarningHover: warningColorHover,
      colorWarningFocus: inputColor,
      borderColorWarningFocus: warningColorHover,
      boxShadowWarningFocus: `0 0 0 2px ${changeColor(warningColor, { alpha: 0.2 })}`,
      caretColorWarning: warningColor,
      // error
      borderColorError: errorColor,
      borderColorErrorHover: errorColorHover,
      colorErrorFocus: inputColor,
      borderColorErrorFocus: errorColorHover,
      boxShadowErrorFocus: `0 0 0 2px ${changeColor(errorColor, { alpha: 0.2 })}`,
      caretColorError: errorColor
    }
  }
})

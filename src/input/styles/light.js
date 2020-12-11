import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { changeColor } from 'seemly'
import { baseLight } from '../../_styles/base'
import {
  baseSuffixLight
} from '../../_base/suffix'

export default create({
  name: 'Input',
  theme: 'light',
  peer: [
    baseLight,
    baseSuffixLight
  ],
  getLocalVars (vars) {
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
      errorColorHover,
      borderRadius
    } = vars
    return {
      ...commonVariables,
      borderRadius,
      iconSize: '16px',
      textColor: textColor2,
      textColorDisabled: textColor4,
      textDecorationColor: textColor2,
      caretColor: primaryColor,
      placeholderColor: textColor4,
      placeholderColorDisabled: textColor5,
      color: inputColor,
      colorDisabled: inputColorDisabled,
      colorFocus: inputColor,
      border: `1px solid ${borderColor}`,
      borderHover: `1px solid ${primaryColorHover}`,
      borderDisabled: `1px solid ${borderColor}`,
      borderFocus: `1px solid ${primaryColorHover}`,
      boxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, { alpha: 0.2 })}`,
      // warning
      borderWarning: `1px solid ${warningColor}`,
      borderHoverWarning: `1px solid ${warningColorHover}`,
      colorFocusWarning: inputColor,
      borderFocusWarning: `1px solid ${warningColorHover}`,
      boxShadowFocusWarning: `0 0 0 2px ${changeColor(warningColor, { alpha: 0.2 })}`,
      caretColorWarning: warningColor,
      // error
      borderError: `1px solid ${errorColor}`,
      borderHoverError: `1px solid ${errorColorHover}`,
      colorFocusError: inputColor,
      borderFocusError: `1px solid ${errorColorHover}`,
      boxShadowFocusError: `0 0 0 2px ${changeColor(errorColor, { alpha: 0.2 })}`,
      caretColorError: errorColor
    }
  }
})

import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { changeColor } from 'seemly'
import { baseDark } from '../../_styles/base'
import {
  baseSuffixDark
} from '../../_base/suffix'

export default create({
  name: 'Input',
  theme: 'dark',
  peer: [
    baseDark,
    baseSuffixDark
  ],
  getLocalVars (vars) {
    const {
      textColor2Overlay,
      textColor4Overlay,
      textColor5Overlay,
      primaryColor,
      primaryColorHover,
      inputColorOverlay,
      inputColorDisabledOverlay,
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
      textColor: textColor2Overlay,
      textColorDisabled: textColor4Overlay,
      textDecorationColor: textColor2Overlay,
      caretColor: primaryColor,
      placeholderColor: textColor4Overlay,
      placeholderColorDisabled: textColor5Overlay,
      color: inputColorOverlay,
      colorDisabled: inputColorDisabledOverlay,
      colorFocus: changeColor(primaryColor, { alpha: 0.1 }),
      border: '1px solid transparent',
      borderHover: `1px solid ${primaryColorHover}`,
      borderDisabled: '1px solid transparent',
      borderFocus: `1px solid ${primaryColorHover}`,
      boxShadowFocus: `0 0 8px 0 ${changeColor(primaryColor, { alpha: 0.3 })}`,
      // warning
      borderWarning: `1px solid ${warningColor}`,
      borderHoverWarning: `1px solid ${warningColorHover}`,
      colorFocusWarning: changeColor(warningColor, { alpha: 0.1 }),
      borderFocusWarning: `1px solid ${warningColorHover}`,
      boxShadowFocusWarning: `0 0 8px 0 ${changeColor(warningColor, { alpha: 0.3 })}`,
      caretColorWarning: warningColor,
      // error
      borderError: `1px solid ${errorColor}`,
      borderHoverError: `1px solid ${errorColorHover}`,
      colorFocusError: changeColor(errorColor, { alpha: 0.1 }),
      borderFocusError: `1px solid ${errorColorHover}`,
      boxShadowFocusError: `0 0 8px 0 ${changeColor(errorColor, { alpha: 0.3 })}`,
      caretColorError: errorColor
    }
  }
})

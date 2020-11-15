import create from '../../_styles/utils/create-component-base'
import commonVariables from './_common'
import { changeColor } from '../../_utils/color/index'
import {
  baseSuffixDark
} from '../../styles'

export default create({
  name: 'Input',
  theme: 'dark',
  peer: [
    baseSuffixDark
  ],
  getDerivedVariables ({ base, derived }) {
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
      errorColorHover
    } = derived
    const {
      borderRadius
    } = base
    return {
      ...commonVariables,
      borderRadius,
      iconSize: '16px',
      textColor: textColor2Overlay,
      textColorDisabled: textColor4Overlay,
      caretColor: primaryColor,
      placeholderColor: textColor4Overlay,
      placeholderColorDisabled: textColor5Overlay,
      backgroundColor: inputColorOverlay,
      colorDisabled: inputColorDisabledOverlay,
      colorFocus: changeColor(primaryColor, { alpha: 0.1 }),
      borderColor: 'transparent',
      borderColorHover: primaryColorHover,
      borderColorDisabled: 'transparent !important',
      borderColorFocus: primaryColorHover,
      boxShadow: 'inset 0 0 0 1px transparent',
      boxShadowFocus: `0 0 8px 0 ${changeColor(primaryColor, { alpha: 0.3 })}`,
      boxShadowDisabled: 'inset 0 0 0 1px transparent',
      // warning
      borderColorWarning: warningColor,
      borderColorHoverWarning: warningColorHover,
      colorFocusWarning: changeColor(warningColor, { alpha: 0.1 }),
      borderColorFocusWarning: warningColorHover,
      boxShadowFocusWarning: `0 0 8px 0 ${changeColor(warningColor, { alpha: 0.3 })}`,
      caretColorWarning: warningColor,
      // error
      borderColorError: errorColor,
      borderColorHoverError: errorColorHover,
      colorFocusError: changeColor(errorColor, { alpha: 0.1 }),
      borderColorFocusError: errorColorHover,
      boxShadowFocusError: `0 0 8px 0 ${changeColor(errorColor, { alpha: 0.3 })}`,
      caretColorError: errorColor
    }
  }
})

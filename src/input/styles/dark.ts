import commonVariables from './_common'
import { changeColor } from 'seemly'
import { commonDark } from '../../_styles/common'
import type { InputTheme } from './light'

const inputDark: InputTheme = {
  name: 'Input',
  common: commonDark,
  self (vars) {
    const {
      textColor2,
      textColor4,
      textColor5,
      primaryColor,
      primaryColorHover,
      inputColor,
      inputColorDisabled,
      warningColor,
      warningColorHover,
      errorColor,
      errorColorHover,
      borderRadius,
      lineHeight,
      fontSizeTiny,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      heightTiny,
      heightSmall,
      heightMedium,
      heightLarge,
      clearColor,
      clearColorHover,
      clearColorPressed
    } = vars
    return {
      ...commonVariables,
      heightTiny,
      heightSmall,
      heightMedium,
      heightLarge,
      fontSizeTiny,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      lineHeight,
      lineHeightTextarea: lineHeight,
      borderRadius,
      iconSize: '16px',
      groupLabelColor: inputColor,
      textColor: textColor2,
      textColorDisabled: textColor4,
      textDecorationColor: textColor2,
      groupLabelTextColor: textColor2,
      caretColor: primaryColor,
      placeholderColor: textColor4,
      placeholderColorDisabled: textColor5,
      color: inputColor,
      colorDisabled: inputColorDisabled,
      colorFocus: changeColor(primaryColor, { alpha: 0.1 }),
      groupLabelBorder: '1px solid transparent',
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
      boxShadowFocusWarning: `0 0 8px 0 ${changeColor(warningColor, {
        alpha: 0.3
      })}`,
      caretColorWarning: warningColor,
      // error
      borderError: `1px solid ${errorColor}`,
      borderHoverError: `1px solid ${errorColorHover}`,
      colorFocusError: changeColor(errorColor, { alpha: 0.1 }),
      borderFocusError: `1px solid ${errorColorHover}`,
      boxShadowFocusError: `0 0 8px 0 ${changeColor(errorColor, {
        alpha: 0.3
      })}`,
      caretColorError: errorColor,
      clearColor,
      clearColorHover,
      clearColorPressed,
      iconColor: textColor4,
      iconColorDisabled: textColor5,
      suffixTextColor: textColor2
    }
  }
}

export default inputDark

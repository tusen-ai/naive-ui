import commonVariables from './_common'
import { changeColor, scaleColor } from 'seemly'
import { commonDark } from '../../_styles/common'
import type { InputTheme } from './light'

const inputDark: InputTheme = {
  name: 'Input',
  common: commonDark,
  self (vars) {
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
      borderRadius,
      lineHeight,
      fontSizeTiny,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      heightTiny,
      heightSmall,
      heightMedium,
      heightLarge
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
      groupLabelColor: inputColorOverlay,
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
      clearColor: textColor4Overlay,
      clearColorHover: scaleColor(textColor4Overlay, { alpha: 1.25 }),
      clearColorPressed: scaleColor(textColor4Overlay, { alpha: 0.75 })
    }
  }
}

export default inputDark

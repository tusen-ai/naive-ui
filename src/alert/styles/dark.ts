import { changeColor } from 'seemly'
import { commonDark } from '../../_styles/common'
import type { AlertTheme } from './light'
import commonVars from './_common'

const alertDark: AlertTheme = {
  name: 'Alert',
  common: commonDark,
  self (vars) {
    const {
      lineHeight,
      borderRadius,
      fontWeightStrong,
      dividerColor,
      inputColor,
      textColor1,
      textColor2,
      closeColorHover,
      closeColorPressed,
      closeIconColor,
      closeIconColorHover,
      closeIconColorPressed,
      infoColorSuppl,
      successColorSuppl,
      warningColorSuppl,
      errorColorSuppl,
      fontSize
    } = vars
    return {
      ...commonVars,
      fontSize,
      lineHeight,
      titleFontWeight: fontWeightStrong,
      borderRadius,
      border: `1px solid ${dividerColor}`,
      color: inputColor,
      titleTextColor: textColor1,
      iconColor: textColor2,
      contentTextColor: textColor2,
      closeBorderRadius: borderRadius,
      closeColorHover,
      closeColorPressed,
      closeIconColor,
      closeIconColorHover,
      closeIconColorPressed,
      borderInfo: `1px solid ${changeColor(infoColorSuppl, { alpha: 0.35 })}`,
      colorInfo: changeColor(infoColorSuppl, { alpha: 0.25 }),
      titleTextColorInfo: textColor1,
      iconColorInfo: infoColorSuppl,
      contentTextColorInfo: textColor2,
      closeColorHoverInfo: closeColorHover,
      closeColorPressedInfo: closeColorPressed,
      closeIconColorInfo: closeIconColor,
      closeIconColorHoverInfo: closeIconColorHover,
      closeIconColorPressedInfo: closeIconColorPressed,
      borderSuccess: `1px solid ${changeColor(successColorSuppl, {
        alpha: 0.35
      })}`,
      colorSuccess: changeColor(successColorSuppl, { alpha: 0.25 }),
      titleTextColorSuccess: textColor1,
      iconColorSuccess: successColorSuppl,
      contentTextColorSuccess: textColor2,
      closeColorHoverSuccess: closeColorHover,
      closeColorPressedSuccess: closeColorPressed,
      closeIconColorSuccess: closeIconColor,
      closeIconColorHoverSuccess: closeIconColorHover,
      closeIconColorPressedSuccess: closeIconColorPressed,
      borderWarning: `1px solid ${changeColor(warningColorSuppl, {
        alpha: 0.35
      })}`,
      colorWarning: changeColor(warningColorSuppl, { alpha: 0.25 }),
      titleTextColorWarning: textColor1,
      iconColorWarning: warningColorSuppl,
      contentTextColorWarning: textColor2,
      closeColorHoverWarning: closeColorHover,
      closeColorPressedWarning: closeColorPressed,
      closeIconColorWarning: closeIconColor,
      closeIconColorHoverWarning: closeIconColorHover,
      closeIconColorPressedWarning: closeIconColorPressed,
      borderError: `1px solid ${changeColor(errorColorSuppl, { alpha: 0.35 })}`,
      colorError: changeColor(errorColorSuppl, { alpha: 0.25 }),
      titleTextColorError: textColor1,
      iconColorError: errorColorSuppl,
      contentTextColorError: textColor2,
      closeColorHoverError: closeColorHover,
      closeColorPressedError: closeColorPressed,
      closeIconColorError: closeIconColor,
      closeIconColorHoverError: closeIconColorHover,
      closeIconColorPressedError: closeIconColorPressed
    }
  }
}

export default alertDark

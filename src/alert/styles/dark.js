import { changeColor } from 'seemly'
import { commonDark } from '../../_styles/new-common'

export default {
  common: commonDark,
  self (vars) {
    const {
      lineHeight,
      borderRadius,
      fontWeightStrong,
      dividerColorOverlay,
      inputColorOverlay,
      textColor1Overlay,
      textColor2Overlay,
      closeColorOverlay,
      closeColorHoverOverlay,
      closeColorPressedOverlay,
      infoColorSuppl,
      successColorSuppl,
      warningColorSuppl,
      errorColorSuppl,
      fontSize
    } = vars
    return {
      fontSize,
      lineHeight,
      titleFontWeight: fontWeightStrong,
      borderRadius,
      border: `1px solid ${dividerColorOverlay}`,
      color: inputColorOverlay,
      titleTextColor: textColor1Overlay,
      iconColor: textColor2Overlay,
      contentTextColor: textColor2Overlay,
      closeColor: closeColorOverlay,
      closeColorHover: closeColorHoverOverlay,
      closeColorPressed: closeColorPressedOverlay,
      borderInfo: `1px solid ${changeColor(infoColorSuppl, { alpha: 0.35 })}`,
      colorInfo: changeColor(infoColorSuppl, { alpha: 0.25 }),
      titleTextColorInfo: textColor1Overlay,
      iconColorInfo: infoColorSuppl,
      contentTextColorInfo: textColor2Overlay,
      closeColorInfo: closeColorOverlay,
      closeColorHoverInfo: closeColorHoverOverlay,
      closeColorPressedInfo: closeColorPressedOverlay,
      borderSuccess: `1px solid ${changeColor(successColorSuppl, {
        alpha: 0.35
      })}`,
      colorSuccess: changeColor(successColorSuppl, { alpha: 0.25 }),
      titleTextColorSuccess: textColor1Overlay,
      iconColorSuccess: successColorSuppl,
      contentTextColorSuccess: textColor2Overlay,
      closeColorSuccess: closeColorOverlay,
      closeColorHoverSuccess: closeColorHoverOverlay,
      closeColorPressedSuccess: closeColorPressedOverlay,
      borderWarning: `1px solid ${changeColor(warningColorSuppl, {
        alpha: 0.35
      })}`,
      colorWarning: changeColor(warningColorSuppl, { alpha: 0.25 }),
      titleTextColorWarning: textColor1Overlay,
      iconColorWarning: warningColorSuppl,
      contentTextColorWarning: textColor2Overlay,
      closeColorWarning: closeColorOverlay,
      closeColorHoverWarning: closeColorHoverOverlay,
      closeColorPressedWarning: closeColorPressedOverlay,
      borderError: `1px solid ${changeColor(errorColorSuppl, { alpha: 0.35 })}`,
      colorError: changeColor(errorColorSuppl, { alpha: 0.25 }),
      titleTextColorError: textColor1Overlay,
      iconColorError: errorColorSuppl,
      contentTextColorError: textColor2Overlay,
      closeColorError: closeColorOverlay,
      closeColorHoverError: closeColorHoverOverlay,
      closeColorPressedError: closeColorPressedOverlay
    }
  }
}

import create from '../../_styles/utils/create-component-base'
import { composite, changeColor } from 'seemly'

export default create({
  theme: 'light',
  name: 'Alert',
  getLocalVars (vars) {
    const {
      borderRadius,
      fontWeightStrong,
      baseColor,
      dividerColorOverlay,
      actionColor,
      textColor1Overlay,
      textColor2Overlay,
      closeColor,
      closeColorHover,
      closeColorPressed,
      infoColor,
      successColor,
      warningColor,
      errorColor
    } = vars
    return {
      titleFontWeight: fontWeightStrong,
      borderRadius,
      border: `1px solid ${dividerColorOverlay}`,
      color: actionColor,
      titleTextColor: textColor1Overlay,
      iconColor: textColor2Overlay,
      contentTextColor: textColor2Overlay,
      closeColor,
      closeColorHover,
      closeColorPressed,
      borderInfo: `1px solid ${composite(baseColor, changeColor(infoColor, { alpha: 0.25 }))}`,
      colorInfo: composite(baseColor, changeColor(infoColor, { alpha: 0.08 })),
      titleTextColorInfo: textColor1Overlay,
      iconColorInfo: infoColor,
      contentTextColorInfo: textColor2Overlay,
      closeColorInfo: closeColor,
      closeColorHoverInfo: closeColorHover,
      closeColorPressedInfo: closeColorPressed,
      borderSuccess: `1px solid ${composite(baseColor, changeColor(successColor, { alpha: 0.25 }))}`,
      colorSuccess: composite(baseColor, changeColor(successColor, { alpha: 0.08 })),
      titleTextColorSuccess: textColor1Overlay,
      iconColorSuccess: successColor,
      contentTextColorSuccess: textColor2Overlay,
      closeColorSuccess: closeColor,
      closeColorHoverSuccess: closeColorHover,
      closeColorPressedSuccess: closeColorPressed,
      borderWarning: `1px solid ${composite(baseColor, changeColor(warningColor, { alpha: 0.33 }))}`,
      colorWarning: composite(baseColor, changeColor(warningColor, { alpha: 0.08 })),
      titleTextColorWarning: textColor1Overlay,
      iconColorWarning: warningColor,
      contentTextColorWarning: textColor2Overlay,
      closeColorWarning: closeColor,
      closeColorHoverWarning: closeColorHover,
      closeColorPressedWarning: closeColorPressed,
      borderError: `1px solid ${composite(baseColor, changeColor(errorColor, { alpha: 0.25 }))}`,
      colorError: composite(baseColor, changeColor(errorColor, { alpha: 0.08 })),
      titleTextColorError: textColor1Overlay,
      iconColorError: errorColor,
      contentTextColorError: textColor2Overlay,
      closeColorError: closeColor,
      closeColorHoverError: closeColorHover,
      closeColorPressedError: closeColorPressed
    }
  }
})

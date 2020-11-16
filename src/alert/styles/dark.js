import create from '../../_styles/utils/create-component-base'
import { changeColor } from '../../_utils/color/index'

export default create({
  theme: 'dark',
  name: 'Alert',
  getDerivedVariables ({ base, derived }) {
    const {
      borderRadius,
      fontWeightStrong
    } = base
    const {
      dividerColorOverlay,
      inputColorOverlay,
      textColor1Overlay,
      textColor2Overlay,
      closeColorOverlay,
      colorColorHoverOverlay,
      closeColorPressedOverlay,
      infoColorSuppl,
      successColorSuppl,
      warningColorSuppl,
      errorColorSuppl
    } = derived
    return {
      titleFontWeight: fontWeightStrong,
      borderRadius,
      border: `1px solid ${dividerColorOverlay}`,
      color: inputColorOverlay,
      titleTextColor: textColor1Overlay,
      iconColor: textColor2Overlay,
      contentTextColor: textColor2Overlay,
      closeColor: closeColorOverlay,
      closeColorHover: colorColorHoverOverlay,
      closeColorPressed: closeColorPressedOverlay,
      borderInfo: `1px solid ${changeColor(infoColorSuppl, { alpha: 0.35 })}`,
      colorInfo: changeColor(infoColorSuppl, { alpha: 0.25 }),
      titleTextColorInfo: textColor1Overlay,
      iconColorInfo: infoColorSuppl,
      contentTextColorInfo: textColor2Overlay,
      closeColorInfo: closeColorOverlay,
      closeColorHoverInfo: colorColorHoverOverlay,
      closeColorPressedInfo: closeColorPressedOverlay,
      borderSuccess: `1px solid ${changeColor(successColorSuppl, { alpha: 0.35 })}`,
      colorSuccess: changeColor(successColorSuppl, { alpha: 0.25 }),
      titleTextColorSuccess: textColor1Overlay,
      iconColorSuccess: successColorSuppl,
      contentTextColorSuccess: textColor2Overlay,
      closeColorSuccess: closeColorOverlay,
      closeColorHoverSuccess: colorColorHoverOverlay,
      closeColorPressedSuccess: closeColorPressedOverlay,
      borderWarning: `1px solid ${changeColor(warningColorSuppl, { alpha: 0.35 })}`,
      colorWarning: changeColor(warningColorSuppl, { alpha: 0.25 }),
      titleTextColorWarning: textColor1Overlay,
      iconColorWarning: warningColorSuppl,
      contentTextColorWarning: textColor2Overlay,
      closeColorWarning: closeColorOverlay,
      closeColorHoverWarning: colorColorHoverOverlay,
      closeColorPressedWarning: closeColorPressedOverlay,
      borderError: `1px solid ${changeColor(errorColorSuppl, { alpha: 0.35 })}`,
      colorError: changeColor(errorColorSuppl, { alpha: 0.25 }),
      titleTextColorError: textColor1Overlay,
      iconColorError: errorColorSuppl,
      contentTextColorError: textColor2Overlay,
      closeColorError: closeColorOverlay,
      closeColorHoverError: colorColorHoverOverlay,
      closeColorPressedError: closeColorPressedOverlay
    }
  }
})

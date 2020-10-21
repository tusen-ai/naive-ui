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
      default: {
        borderColor: dividerColorOverlay,
        color: inputColorOverlay,
        titleTextColor: textColor1Overlay,
        iconColor: textColor2Overlay,
        contentTextColor: textColor2Overlay,
        closeColor: closeColorOverlay,
        closeColorHover: colorColorHoverOverlay,
        closeColorActive: closeColorPressedOverlay
      },
      info: {
        borderColor: changeColor(infoColorSuppl, { alpha: 0.35 }),
        color: changeColor(infoColorSuppl, { alpha: 0.25 }),
        titleTextColor: textColor1Overlay,
        iconColor: infoColorSuppl,
        contentTextColor: textColor2Overlay,
        closeColor: closeColorOverlay,
        closeColorHover: colorColorHoverOverlay,
        closeColorActive: closeColorPressedOverlay
      },
      success: {
        borderColor: changeColor(successColorSuppl, { alpha: 0.35 }),
        color: changeColor(successColorSuppl, { alpha: 0.25 }),
        titleTextColor: textColor1Overlay,
        iconColor: successColorSuppl,
        contentTextColor: textColor2Overlay,
        closeColor: closeColorOverlay,
        closeColorHover: colorColorHoverOverlay,
        closeColorActive: closeColorPressedOverlay
      },
      warning: {
        borderColor: changeColor(warningColorSuppl, { alpha: 0.35 }),
        color: changeColor(warningColorSuppl, { alpha: 0.25 }),
        titleTextColor: textColor1Overlay,
        iconColor: warningColorSuppl,
        contentTextColor: textColor2Overlay,
        closeColor: closeColorOverlay,
        closeColorHover: colorColorHoverOverlay,
        closeColorActive: closeColorPressedOverlay
      },
      error: {
        borderColor: changeColor(errorColorSuppl, { alpha: 0.35 }),
        color: changeColor(errorColorSuppl, { alpha: 0.25 }),
        titleTextColor: textColor1Overlay,
        iconColor: errorColorSuppl,
        contentTextColor: textColor2Overlay,
        closeColor: closeColorOverlay,
        closeColorHover: colorColorHoverOverlay,
        closeColorActive: closeColorPressedOverlay
      }
    }
  }
})

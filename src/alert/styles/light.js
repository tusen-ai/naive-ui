import create from '../../_styles/utils/create-component-base'
import { composite, changeColor } from '../../_utils/color/index'

export default create({
  theme: 'light',
  name: 'Alert',
  getDerivedVariables ({ base, derived }) {
    const {
      borderRadius,
      fontWeightStrong
    } = base
    const {
      baseColor,
      dividerColorOverlay,
      actionColor,
      textColor1Overlay,
      textColor2Overlay,
      closeColor,
      closeColorHover,
      closeColorActive,
      infoColor,
      successColor,
      warningColor,
      errorColor
    } = derived
    return {
      titleFontWeight: fontWeightStrong,
      borderRadius,
      default: {
        borderColor: dividerColorOverlay,
        color: actionColor,
        titleTextColor: textColor1Overlay,
        iconColor: textColor2Overlay,
        contentTextColor: textColor2Overlay,
        closeColor: closeColor,
        closeColorHover: closeColorHover,
        closeColorActive: closeColorActive
      },
      info: {
        borderColor: composite(baseColor, changeColor(infoColor, { alpha: 0.25 })),
        color: composite(baseColor, changeColor(infoColor, { alpha: 0.08 })),
        titleTextColor: textColor1Overlay,
        iconColor: infoColor,
        contentTextColor: textColor2Overlay,
        closeColor: closeColor,
        closeColorHover: closeColorHover,
        closeColorActive: closeColorActive
      },
      success: {
        borderColor: composite(baseColor, changeColor(successColor, { alpha: 0.25 })),
        color: composite(baseColor, changeColor(successColor, { alpha: 0.08 })),
        titleTextColor: textColor1Overlay,
        iconColor: successColor,
        contentTextColor: textColor2Overlay,
        closeColor: closeColor,
        closeColorHover: closeColorHover,
        closeColorActive: closeColorActive
      },
      warning: {
        borderColor: composite(baseColor, changeColor(warningColor, { alpha: 0.33 })),
        color: composite(baseColor, changeColor(warningColor, { alpha: 0.08 })),
        titleTextColor: textColor1Overlay,
        iconColor: warningColor,
        contentTextColor: textColor2Overlay,
        closeColor: closeColor,
        closeColorHover: closeColorHover,
        closeColorActive: closeColorActive
      },
      error: {
        borderColor: composite(baseColor, changeColor(errorColor, { alpha: 0.25 })),
        color: composite(baseColor, changeColor(errorColor, { alpha: 0.08 })),
        titleTextColor: textColor1Overlay,
        iconColor: errorColor,
        contentTextColor: textColor2Overlay,
        closeColor: closeColor,
        closeColorHover: closeColorHover,
        closeColorActive: closeColorActive
      }
    }
  }
})

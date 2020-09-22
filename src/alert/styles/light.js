import create from '../../styles/_utils/create-component-base'
import { composite, changeColor } from '../../_utils/color/index'

export default create({
  theme: 'light',
  name: 'Alert',
  getDerivedVariables ({ base, derived }) {
    const {
      borderRadius,
      strongFontWeight
    } = base
    const {
      baseColor,
      dividerColorOverlay,
      actionColor,
      textColorPrimaryOverlay,
      textColorSecondaryOverlay,
      closeColor,
      closeHoverColor,
      closeColorActive,
      infoColor,
      successColor,
      warningColor,
      errorColor
    } = derived
    return {
      titleFontWeight: strongFontWeight,
      borderRadius,
      default: {
        borderColor: dividerColorOverlay,
        color: actionColor,
        titleTextColor: textColorPrimaryOverlay,
        iconColor: textColorSecondaryOverlay,
        contentTextColor: textColorSecondaryOverlay,
        closeColor: closeColor,
        closeColorHover: closeHoverColor,
        closeColorActive: closeColorActive
      },
      info: {
        borderColor: composite(baseColor, changeColor(infoColor, { alpha: 0.25 })),
        color: composite(baseColor, changeColor(infoColor, { alpha: 0.08 })),
        titleTextColor: textColorPrimaryOverlay,
        iconColor: infoColor,
        contentTextColor: textColorSecondaryOverlay,
        closeColor: closeColor,
        closeColorHover: closeHoverColor,
        closeColorActive: closeColorActive
      },
      success: {
        borderColor: composite(baseColor, changeColor(successColor, { alpha: 0.25 })),
        color: composite(baseColor, changeColor(successColor, { alpha: 0.08 })),
        titleTextColor: textColorPrimaryOverlay,
        iconColor: successColor,
        contentTextColor: textColorSecondaryOverlay,
        closeColor: closeColor,
        closeColorHover: closeHoverColor,
        closeColorActive: closeColorActive
      },
      warning: {
        borderColor: composite(baseColor, changeColor(warningColor, { alpha: 0.33 })),
        color: composite(baseColor, changeColor(warningColor, { alpha: 0.08 })),
        titleTextColor: textColorPrimaryOverlay,
        iconColor: warningColor,
        contentTextColor: textColorSecondaryOverlay,
        closeColor: closeColor,
        closeColorHover: closeHoverColor,
        closeColorActive: closeColorActive
      },
      error: {
        borderColor: composite(baseColor, changeColor(errorColor, { alpha: 0.25 })),
        color: composite(baseColor, changeColor(errorColor, { alpha: 0.08 })),
        titleTextColor: textColorPrimaryOverlay,
        iconColor: errorColor,
        contentTextColor: textColorSecondaryOverlay,
        closeColor: closeColor,
        closeColorHover: closeHoverColor,
        closeColorActive: closeColorActive
      }
    }
  }
})

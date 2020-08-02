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
      baseBackgroundColor,
      dividerOverlayColor,
      actionBackgroundColor,
      primaryTextOverlayColor,
      secondaryTextOverlayColor,
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
        borderColor: dividerOverlayColor,
        color: actionBackgroundColor,
        titleTextColor: primaryTextOverlayColor,
        iconColor: secondaryTextOverlayColor,
        contentTextColor: secondaryTextOverlayColor,
        closeColor: closeColor,
        closeColorHover: closeHoverColor,
        closeColorActive: closeColorActive
      },
      info: {
        borderColor: composite(baseBackgroundColor, changeColor(infoColor, { alpha: 0.25 })),
        color: composite(baseBackgroundColor, changeColor(infoColor, { alpha: 0.08 })),
        titleTextColor: primaryTextOverlayColor,
        iconColor: infoColor,
        contentTextColor: secondaryTextOverlayColor,
        closeColor: closeColor,
        closeColorHover: closeHoverColor,
        closeColorActive: closeColorActive
      },
      success: {
        borderColor: composite(baseBackgroundColor, changeColor(successColor, { alpha: 0.25 })),
        color: composite(baseBackgroundColor, changeColor(successColor, { alpha: 0.08 })),
        titleTextColor: primaryTextOverlayColor,
        iconColor: successColor,
        contentTextColor: secondaryTextOverlayColor,
        closeColor: closeColor,
        closeColorHover: closeHoverColor,
        closeColorActive: closeColorActive
      },
      warning: {
        borderColor: composite(baseBackgroundColor, changeColor(warningColor, { alpha: 0.33 })),
        color: composite(baseBackgroundColor, changeColor(warningColor, { alpha: 0.08 })),
        titleTextColor: primaryTextOverlayColor,
        iconColor: warningColor,
        contentTextColor: secondaryTextOverlayColor,
        closeColor: closeColor,
        closeColorHover: closeHoverColor,
        closeColorActive: closeColorActive
      },
      error: {
        borderColor: composite(baseBackgroundColor, changeColor(errorColor, { alpha: 0.25 })),
        color: composite(baseBackgroundColor, changeColor(errorColor, { alpha: 0.08 })),
        titleTextColor: primaryTextOverlayColor,
        iconColor: errorColor,
        contentTextColor: secondaryTextOverlayColor,
        closeColor: closeColor,
        closeColorHover: closeHoverColor,
        closeColorActive: closeColorActive
      }
    }
  }
})

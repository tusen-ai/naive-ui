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
      closeActiveColor,
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
        backgroundColor: actionBackgroundColor,
        titleTextColor: primaryTextOverlayColor,
        iconColor: secondaryTextOverlayColor,
        contentTextColor: secondaryTextOverlayColor,
        closeColor: closeColor,
        closeHoverColor: closeHoverColor,
        closeActiveColor: closeActiveColor
      },
      info: {
        borderColor: composite(baseBackgroundColor, changeColor(infoColor, { alpha: 0.25 })),
        backgroundColor: composite(baseBackgroundColor, changeColor(infoColor, { alpha: 0.08 })),
        titleTextColor: primaryTextOverlayColor,
        iconColor: infoColor,
        contentTextColor: secondaryTextOverlayColor,
        closeColor: closeColor,
        closeHoverColor: closeHoverColor,
        closeActiveColor: closeActiveColor
      },
      success: {
        borderColor: composite(baseBackgroundColor, changeColor(successColor, { alpha: 0.25 })),
        backgroundColor: composite(baseBackgroundColor, changeColor(successColor, { alpha: 0.08 })),
        titleTextColor: primaryTextOverlayColor,
        iconColor: successColor,
        contentTextColor: secondaryTextOverlayColor,
        closeColor: closeColor,
        closeHoverColor: closeHoverColor,
        closeActiveColor: closeActiveColor
      },
      warning: {
        borderColor: composite(baseBackgroundColor, changeColor(warningColor, { alpha: 0.33 })),
        backgroundColor: composite(baseBackgroundColor, changeColor(warningColor, { alpha: 0.08 })),
        titleTextColor: primaryTextOverlayColor,
        iconColor: warningColor,
        contentTextColor: secondaryTextOverlayColor,
        closeColor: closeColor,
        closeHoverColor: closeHoverColor,
        closeActiveColor: closeActiveColor
      },
      error: {
        borderColor: composite(baseBackgroundColor, changeColor(errorColor, { alpha: 0.25 })),
        backgroundColor: composite(baseBackgroundColor, changeColor(errorColor, { alpha: 0.08 })),
        titleTextColor: primaryTextOverlayColor,
        iconColor: errorColor,
        contentTextColor: secondaryTextOverlayColor,
        closeColor: closeColor,
        closeHoverColor: closeHoverColor,
        closeActiveColor: closeActiveColor
      }
    }
  }
})

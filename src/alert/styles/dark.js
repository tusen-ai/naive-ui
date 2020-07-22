import create from '../../styles/_utils/create-component-base'
import { changeColor } from '../../_utils/color/index'

export default create({
  theme: 'dark',
  name: 'Alert',
  getDerivedVariables ({ base, derived }) {
    const {
      borderRadius,
      strongFontWeight
    } = base
    const {
      dividerOverlayColor,
      inputBackgroundOverlayColor,
      primaryTextOverlayColor,
      secondaryTextOverlayColor,
      closeOverlayColor,
      closeHoverOverlayColor,
      closeActiveOverlayColor,
      infoHsColor,
      successHsColor,
      warningHsColor,
      errorHsColor
    } = derived
    return {
      titleFontWeight: strongFontWeight,
      borderRadius,
      default: {
        borderColor: dividerOverlayColor,
        backgroundColor: inputBackgroundOverlayColor,
        titleTextColor: primaryTextOverlayColor,
        iconColor: secondaryTextOverlayColor,
        contentTextColor: secondaryTextOverlayColor,
        closeColor: closeOverlayColor,
        closeHoverColor: closeHoverOverlayColor,
        closeActiveColor: closeActiveOverlayColor
      },
      info: {
        borderColor: changeColor(infoHsColor, { alpha: 0.35 }),
        backgroundColor: changeColor(infoHsColor, { alpha: 0.25 }),
        titleTextColor: primaryTextOverlayColor,
        iconColor: infoHsColor,
        contentTextColor: secondaryTextOverlayColor,
        closeColor: closeOverlayColor,
        closeHoverColor: closeHoverOverlayColor,
        closeActiveColor: closeActiveOverlayColor
      },
      success: {
        borderColor: changeColor(successHsColor, { alpha: 0.35 }),
        backgroundColor: changeColor(successHsColor, { alpha: 0.25 }),
        titleTextColor: primaryTextOverlayColor,
        iconColor: successHsColor,
        contentTextColor: secondaryTextOverlayColor,
        closeColor: closeOverlayColor,
        closeHoverColor: closeHoverOverlayColor,
        closeActiveColor: closeActiveOverlayColor
      },
      warning: {
        borderColor: changeColor(warningHsColor, { alpha: 0.35 }),
        backgroundColor: changeColor(warningHsColor, { alpha: 0.25 }),
        titleTextColor: primaryTextOverlayColor,
        iconColor: warningHsColor,
        contentTextColor: secondaryTextOverlayColor,
        closeColor: closeOverlayColor,
        closeHoverColor: closeHoverOverlayColor,
        closeActiveColor: closeActiveOverlayColor
      },
      error: {
        borderColor: changeColor(errorHsColor, { alpha: 0.35 }),
        backgroundColor: changeColor(errorHsColor, { alpha: 0.25 }),
        titleTextColor: primaryTextOverlayColor,
        iconColor: errorHsColor,
        contentTextColor: secondaryTextOverlayColor,
        closeColor: closeOverlayColor,
        closeHoverColor: closeHoverOverlayColor,
        closeActiveColor: closeActiveOverlayColor
      }
    }
  }
})

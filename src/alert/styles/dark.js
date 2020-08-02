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
        color: inputBackgroundOverlayColor,
        titleTextColor: primaryTextOverlayColor,
        iconColor: secondaryTextOverlayColor,
        contentTextColor: secondaryTextOverlayColor,
        closeColor: closeOverlayColor,
        closeColorHover: closeHoverOverlayColor,
        closeColorActive: closeActiveOverlayColor
      },
      info: {
        borderColor: changeColor(infoHsColor, { alpha: 0.35 }),
        color: changeColor(infoHsColor, { alpha: 0.25 }),
        titleTextColor: primaryTextOverlayColor,
        iconColor: infoHsColor,
        contentTextColor: secondaryTextOverlayColor,
        closeColor: closeOverlayColor,
        closeColorHover: closeHoverOverlayColor,
        closeColorActive: closeActiveOverlayColor
      },
      success: {
        borderColor: changeColor(successHsColor, { alpha: 0.35 }),
        color: changeColor(successHsColor, { alpha: 0.25 }),
        titleTextColor: primaryTextOverlayColor,
        iconColor: successHsColor,
        contentTextColor: secondaryTextOverlayColor,
        closeColor: closeOverlayColor,
        closeColorHover: closeHoverOverlayColor,
        closeColorActive: closeActiveOverlayColor
      },
      warning: {
        borderColor: changeColor(warningHsColor, { alpha: 0.35 }),
        color: changeColor(warningHsColor, { alpha: 0.25 }),
        titleTextColor: primaryTextOverlayColor,
        iconColor: warningHsColor,
        contentTextColor: secondaryTextOverlayColor,
        closeColor: closeOverlayColor,
        closeColorHover: closeHoverOverlayColor,
        closeColorActive: closeActiveOverlayColor
      },
      error: {
        borderColor: changeColor(errorHsColor, { alpha: 0.35 }),
        color: changeColor(errorHsColor, { alpha: 0.25 }),
        titleTextColor: primaryTextOverlayColor,
        iconColor: errorHsColor,
        contentTextColor: secondaryTextOverlayColor,
        closeColor: closeOverlayColor,
        closeColorHover: closeHoverOverlayColor,
        closeColorActive: closeActiveOverlayColor
      }
    }
  }
})

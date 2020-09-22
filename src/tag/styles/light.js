import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'
import { changeColor } from '../../_utils/color'

export default create({
  theme: 'light',
  name: 'Tag',
  getDerivedVariables ({ base, derived }) {
    const {
      textColorSecondaryOverlay,
      primaryColorHover,
      primaryColorActive,
      primaryColor,
      infoColor,
      successColor,
      warningColor,
      errorColor,
      baseColor,
      borderColorOverlay,
      opacityDisabled,
      tagColor,
      closeOverlayColor,
      closeHoverOverlayColor,
      closeActiveOverlayColor
    } = derived
    const {
      smallBorderRadius: borderRadius
    } = base
    return {
      ...commonVariables,
      borderRadius,
      opacityDisabled,
      checkable: {
        textColor: textColorSecondaryOverlay,
        textColorHover: primaryColorHover,
        textColorActive: primaryColorActive,
        textColorChecked: baseColor,
        color: 'transparent',
        colorHover: 'transparent',
        colorActive: 'transparent',
        colorChecked: primaryColor,
        colorCheckedHover: primaryColorHover,
        colorCheckedActive: primaryColorActive
      },
      default: {
        borderColor: borderColorOverlay,
        textColor: textColorSecondaryOverlay,
        color: tagColor,
        closeColor: closeOverlayColor,
        closeColorHover: closeHoverOverlayColor,
        closeColorActive: closeActiveOverlayColor
      },
      primary: {
        borderColor: changeColor(primaryColor, { alpha: 0.3 }),
        textColor: primaryColor,
        color: changeColor(primaryColor, { alpha: 0.1 }),
        closeColor: changeColor(primaryColor, { alpha: 0.75 }),
        closeColorHover: changeColor(primaryColor, { alpha: 0.6 }),
        closeColorActive: changeColor(primaryColor, { alpha: 0.9 })
      },
      info: {
        borderColor: changeColor(infoColor, { alpha: 0.3 }),
        textColor: infoColor,
        color: changeColor(infoColor, { alpha: 0.1 }),
        closeColor: changeColor(infoColor, { alpha: 0.75 }),
        closeColorHover: changeColor(infoColor, { alpha: 0.6 }),
        closeColorActive: changeColor(infoColor, { alpha: 0.9 })
      },
      success: {
        borderColor: changeColor(successColor, { alpha: 0.3 }),
        textColor: successColor,
        color: changeColor(successColor, { alpha: 0.1 }),
        closeColor: changeColor(successColor, { alpha: 0.75 }),
        closeColorHover: changeColor(successColor, { alpha: 0.6 }),
        closeColorActive: changeColor(successColor, { alpha: 0.9 })
      },
      warning: {
        borderColor: changeColor(warningColor, { alpha: 0.35 }),
        textColor: warningColor,
        color: changeColor(warningColor, { alpha: 0.12 }),
        closeColor: changeColor(warningColor, { alpha: 0.75 }),
        closeColorHover: changeColor(warningColor, { alpha: 0.6 }),
        closeColorActive: changeColor(warningColor, { alpha: 0.9 })
      },
      error: {
        borderColor: changeColor(errorColor, { alpha: 0.23 }),
        textColor: errorColor,
        color: changeColor(errorColor, { alpha: 0.08 }),
        closeColor: changeColor(errorColor, { alpha: 0.65 }),
        closeColorHover: changeColor(errorColor, { alpha: 0.5 }),
        closeColorActive: changeColor(errorColor, { alpha: 0.8 })
      }
    }
  }
})

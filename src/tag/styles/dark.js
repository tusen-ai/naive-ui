import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'
import { changeColor } from '../../_utils/color'

export default create({
  theme: 'dark',
  name: 'Tag',
  getDerivedVariables ({ base, derived }) {
    const {
      textColorSecondaryOverlay,
      primaryColorHover,
      primaryColorPressed,
      primaryColor,
      infoColor,
      successColor,
      warningColor,
      errorColor,
      baseColor,
      borderColorOverlay,
      opacityDisabled,
      closeColorOverlay,
      colorColorHoverOverlay,
      closeColorPressedOverlay
    } = derived
    const {
      borderRadiusSmall: borderRadius
    } = base
    return {
      ...commonVariables,
      borderRadius,
      opacityDisabled,
      checkable: {
        textColor: textColorSecondaryOverlay,
        textColorHover: primaryColorHover,
        textColorActive: primaryColorPressed,
        textColorChecked: baseColor,
        color: 'transparent',
        colorHover: 'transparent',
        colorActive: 'transparent',
        colorChecked: primaryColor,
        colorCheckedHover: primaryColorHover,
        colorCheckedActive: primaryColorPressed
      },
      default: {
        borderColor: borderColorOverlay,
        textColor: textColorSecondaryOverlay,
        color: 'transparent',
        closeColor: closeColorOverlay,
        closeColorHover: colorColorHoverOverlay,
        closeColorActive: closeColorPressedOverlay
      },
      primary: {
        borderColor: changeColor(primaryColor, { alpha: 0.3 }),
        textColor: primaryColor,
        color: 'transparent',
        closeColor: changeColor(primaryColor, { alpha: 0.7 }),
        closeColorHover: changeColor(primaryColor, { alpha: 0.85 }),
        closeColorActive: changeColor(primaryColor, { alpha: 0.57 })
      },
      info: {
        borderColor: changeColor(infoColor, { alpha: 0.3 }),
        textColor: infoColor,
        color: 'transparent',
        closeColor: changeColor(infoColor, { alpha: 0.7 }),
        closeColorHover: changeColor(infoColor, { alpha: 0.85 }),
        closeColorActive: changeColor(infoColor, { alpha: 0.57 })
      },
      success: {
        borderColor: changeColor(successColor, { alpha: 0.3 }),
        textColor: successColor,
        color: 'transparent',
        closeColor: changeColor(successColor, { alpha: 0.7 }),
        closeColorHover: changeColor(successColor, { alpha: 0.85 }),
        closeColorActive: changeColor(successColor, { alpha: 0.57 })
      },
      warning: {
        borderColor: changeColor(warningColor, { alpha: 0.3 }),
        textColor: warningColor,
        color: 'transparent',
        closeColor: changeColor(warningColor, { alpha: 0.7 }),
        closeColorHover: changeColor(warningColor, { alpha: 0.85 }),
        closeColorActive: changeColor(warningColor, { alpha: 0.57 })
      },
      error: {
        borderColor: changeColor(errorColor, { alpha: 0.3 }),
        textColor: errorColor,
        color: 'transparent',
        closeColor: changeColor(errorColor, { alpha: 0.7 }),
        closeColorHover: changeColor(errorColor, { alpha: 0.85 }),
        closeColorActive: changeColor(errorColor, { alpha: 0.57 })
      }
    }
  }
})

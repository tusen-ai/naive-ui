import create from '../../styles/_utils/create-component-base'
import commonVariables from '../../styles/_common-style/tag'
import { changeColor } from '../../_utils/color'

export default create({
  theme: 'light',
  name: 'Tag',
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextOverlayColor,
      primaryHoverColor,
      primaryActiveColor,
      primaryColor,
      infoColor,
      successColor,
      warningColor,
      errorColor,
      baseBackgroundColor,
      borderOverlayColor,
      disabledOpacity,
      tagBackgroundColor,
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
      disabledOpacity,
      checkable: {
        textColor: secondaryTextOverlayColor,
        hoverTextColor: primaryHoverColor,
        activeTextColor: primaryActiveColor,
        backgroundColor: 'transparent',
        hoverBackgroundColor: 'transparent',
        activeBackgroundColor: 'transparent',
        checkedTextColor: baseBackgroundColor,
        checkedBackgroundColor: primaryColor,
        checkedHoverBackgroundColor: primaryHoverColor,
        checkedActiveBackgroundColor: primaryActiveColor
      },
      default: {
        borderColor: borderOverlayColor,
        textColor: secondaryTextOverlayColor,
        backgroundColor: tagBackgroundColor,
        closeColor: closeOverlayColor,
        closeHoverColor: closeHoverOverlayColor,
        closeActiveColor: closeActiveOverlayColor
      },
      primary: {
        borderColor: changeColor(primaryColor, { alpha: 0.3 }),
        textColor: primaryColor,
        backgroundColor: changeColor(primaryColor, { alpha: 0.1 }),
        closeColor: changeColor(primaryColor, { alpha: 0.75 }),
        closeHoverColor: changeColor(primaryColor, { alpha: 0.6 }),
        closeActiveColor: changeColor(primaryColor, { alpha: 0.9 })
      },
      info: {
        borderColor: changeColor(infoColor, { alpha: 0.3 }),
        textColor: infoColor,
        backgroundColor: changeColor(infoColor, { alpha: 0.1 }),
        closeColor: changeColor(infoColor, { alpha: 0.75 }),
        closeHoverColor: changeColor(infoColor, { alpha: 0.6 }),
        closeActiveColor: changeColor(infoColor, { alpha: 0.9 })
      },
      success: {
        borderColor: changeColor(successColor, { alpha: 0.3 }),
        textColor: successColor,
        backgroundColor: changeColor(successColor, { alpha: 0.1 }),
        closeColor: changeColor(successColor, { alpha: 0.75 }),
        closeHoverColor: changeColor(successColor, { alpha: 0.6 }),
        closeActiveColor: changeColor(successColor, { alpha: 0.9 })
      },
      warning: {
        borderColor: changeColor(warningColor, { alpha: 0.35 }),
        textColor: warningColor,
        backgroundColor: changeColor(warningColor, { alpha: 0.12 }),
        closeColor: changeColor(warningColor, { alpha: 0.75 }),
        closeHoverColor: changeColor(warningColor, { alpha: 0.6 }),
        closeActiveColor: changeColor(warningColor, { alpha: 0.9 })
      },
      error: {
        borderColor: changeColor(errorColor, { alpha: 0.23 }),
        textColor: errorColor,
        backgroundColor: changeColor(errorColor, { alpha: 0.08 }),
        closeColor: changeColor(errorColor, { alpha: 0.65 }),
        closeHoverColor: changeColor(errorColor, { alpha: 0.5 }),
        closeActiveColor: changeColor(errorColor, { alpha: 0.8 })
      }
    }
  }
})

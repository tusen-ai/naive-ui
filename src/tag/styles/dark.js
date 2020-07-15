import create from '../../styles/_utils/create-component-base'
import commonVariables from '../../styles/_common-style/tag'
import { changeColor } from '../../_utils/color'

export default create({
  theme: 'dark',
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
        backgroundColor: 'transparent',
        closeColor: closeOverlayColor,
        closeHoverColor: closeHoverOverlayColor,
        closeActiveColor: closeActiveOverlayColor
      },
      primary: {
        borderColor: changeColor(primaryColor, { alpha: 0.3 }),
        textColor: primaryColor,
        backgroundColor: 'transparent',
        closeColor: changeColor(primaryColor, { alpha: 0.7 }),
        closeHoverColor: changeColor(primaryColor, { alpha: 0.85 }),
        closeActiveColor: changeColor(primaryColor, { alpha: 0.57 })
      },
      info: {
        borderColor: changeColor(infoColor, { alpha: 0.3 }),
        textColor: infoColor,
        backgroundColor: 'transparent',
        closeColor: changeColor(infoColor, { alpha: 0.7 }),
        closeHoverColor: changeColor(infoColor, { alpha: 0.85 }),
        closeActiveColor: changeColor(infoColor, { alpha: 0.57 })
      },
      success: {
        borderColor: changeColor(successColor, { alpha: 0.3 }),
        textColor: successColor,
        backgroundColor: 'transparent',
        closeColor: changeColor(successColor, { alpha: 0.7 }),
        closeHoverColor: changeColor(successColor, { alpha: 0.85 }),
        closeActiveColor: changeColor(successColor, { alpha: 0.57 })
      },
      warning: {
        borderColor: changeColor(warningColor, { alpha: 0.3 }),
        textColor: warningColor,
        backgroundColor: 'transparent',
        closeColor: changeColor(warningColor, { alpha: 0.7 }),
        closeHoverColor: changeColor(warningColor, { alpha: 0.85 }),
        closeActiveColor: changeColor(warningColor, { alpha: 0.57 })
      },
      error: {
        borderColor: changeColor(errorColor, { alpha: 0.3 }),
        textColor: errorColor,
        backgroundColor: 'transparent',
        closeColor: changeColor(errorColor, { alpha: 0.7 }),
        closeHoverColor: changeColor(errorColor, { alpha: 0.85 }),
        closeActiveColor: changeColor(errorColor, { alpha: 0.57 })
      }
    }
  }
})

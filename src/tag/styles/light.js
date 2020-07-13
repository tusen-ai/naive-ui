import create from '../../styles/_utils/create-component-base'
import commonVariables from '../../styles/_common-style/tag'
import changeColor from '../../_utils/color'

// xxxPaneColor
// xxxBorderColor
// 需要简化，第一，去掉 hover 和 active 的样式，
// 第二，使用不透明度来搞颜色！

export default create({
  theme: 'dark',
  name: 'Tag',
  getDerivedVariables ({ base, derived }) {
    const {
      secondaryTextOverlayColor,
      disabledTextOverlayColor,
      primaryHoverColor,
      primaryActiveColor,
      primaryColor,
      infoColor,
      successColor,
      warningColor,
      errorColor,
      baseBackgroundColor,
      disabledBackgroundOverlayColor,
      pendingBackgroundOverlayColor,
      borderOverlayColor,
      closeOverlayColor,
      disabledOpacity
    } = derived
    const {
      borderRadius
    } = base
    return {
      ...commonVariables,
      borderRadius,
      checkableTextColor: secondaryTextOverlayColor,
      checkableBackgroundColor: 'transparent',
      checkableHoverTextColor: primaryHoverColor,
      checkableHoverBackgroundColor: 'transparent',
      checkableActiveTextColor: baseBackgroundColor,
      checkableActiveBackgroundColor: primaryColor,
      checkableCheckedHoverBackgroundColor: primaryHoverColor,
      checkableCheckedActiveBackgroundColor: primaryActiveColor,
      disabledOpacity,
      default: {
        borderColor: borderOverlayColor,
        disabledBorderColor: borderOverlayColor,
        textColor: secondaryTextOverlayColor,
        disabledTextColor: disabledTextOverlayColor,
        backgroundColor: 'transparent',
        hoverBackgroundColor: pendingBackgroundOverlayColor,
        activeBackgroudColor: pendingBackgroundOverlayColor,
        disabledBackgroundColor: disabledBackgroundOverlayColor,
        closeColor: closeOverlayColor,
        closeHoverColor: closeOverlayColor,
        closeActiveColor: closeOverlayColor,
        disabledCloseColor: borderOverlayColor
      },
      primary: {
        borderColor: changeColor(primaryColor, { alpha: 0.3 }), // tertiary
        disabledBorderColor: changeColor(primaryColor, { alpha: 0.3 }),
        textColor: primaryColor,
        disabledTextColor: primaryColor,
        backgroundColor: 'transparent',
        hoverBackgroundColor: changeColor(primaryColor, { alpha: 0.4 }),
        activeBackgroudColor: changeColor(primaryColor, { alpha: 0.4 }),
        disabledBackgroundColor: 'transparent',
        closeColor: closeOverlayColor,
        closeHoverColor: closeOverlayColor,
        closeActiveColor: closeOverlayColor,
        disabledCloseColor: borderOverlayColor
      },
      info: {
        borderColor: changeColor(infoColor, { alpha: 0.3 }), // tertiary
        disabledBorderColor: changeColor(infoColor, { alpha: 0.3 }),
        textColor: infoColor,
        disabledTextColor: infoColor,
        backgroundColor: 'transparent',
        hoverBackgroundColor: changeColor(infoColor, { alpha: 0.4 }),
        activeBackgroudColor: changeColor(infoColor, { alpha: 0.4 }),
        disabledBackgroundColor: 'transparent',
        closeColor: closeOverlayColor,
        closeHoverColor: closeOverlayColor,
        closeActiveColor: closeOverlayColor,
        disabledCloseColor: borderOverlayColor
      },
      success: {
        borderColor: changeColor(successColor, { alpha: 0.3 }), // tertiary
        disabledBorderColor: changeColor(successColor, { alpha: 0.3 }),
        textColor: successColor,
        disabledTextColor: successColor,
        backgroundColor: 'transparent',
        hoverBackgroundColor: changeColor(successColor, { alpha: 0.4 }),
        activeBackgroudColor: changeColor(successColor, { alpha: 0.4 }),
        disabledBackgroundColor: 'transparent',
        closeColor: closeOverlayColor,
        closeHoverColor: closeOverlayColor,
        closeActiveColor: closeOverlayColor,
        disabledCloseColor: borderOverlayColor
      },
      warning: {
        borderColor: changeColor(warningColor, { alpha: 0.3 }), // tertiary
        disabledBorderColor: changeColor(warningColor, { alpha: 0.3 }),
        textColor: warningColor,
        disabledTextColor: warningColor,
        backgroundColor: 'transparent',
        hoverBackgroundColor: changeColor(warningColor, { alpha: 0.4 }),
        activeBackgroudColor: changeColor(warningColor, { alpha: 0.4 }),
        disabledBackgroundColor: 'transparent',
        closeColor: closeOverlayColor,
        closeHoverColor: closeOverlayColor,
        closeActiveColor: closeOverlayColor,
        disabledCloseColor: borderOverlayColor
      },
      error: {
        borderColor: changeColor(errorColor, { alpha: 0.3 }), // tertiary
        disabledBorderColor: changeColor(errorColor, { alpha: 0.3 }),
        textColor: errorColor,
        disabledTextColor: errorColor,
        backgroundColor: 'transparent',
        hoverBackgroundColor: changeColor(errorColor, { alpha: 0.4 }),
        activeBackgroudColor: changeColor(errorColor, { alpha: 0.4 }),
        disabledBackgroundColor: 'transparent',
        closeColor: closeOverlayColor,
        closeHoverColor: closeOverlayColor,
        closeActiveColor: closeOverlayColor,
        disabledCloseColor: borderOverlayColor
      }
    }
  }
})

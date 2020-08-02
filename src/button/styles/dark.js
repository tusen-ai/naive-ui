import create from '../../styles/_utils/create-component-base'
import commonVariables from '../../styles/_common-style/button'

export default create({
  theme: 'dark',
  name: 'Button',
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      borderRadius: base.borderRadius,
      opacityDisabled: derived.disabledOpacity,
      default: {
        color: 'transparent',
        colorHover: 'transparent',
        colorActive: 'transparent',
        colorFocus: 'transparent',

        textColor: derived.secondaryTextColor,
        textColorHover: derived.primaryHoverColor,
        textColorActive: derived.primaryActiveColor,
        textColorFocus: derived.primaryHoverColor,

        textTypedTextColor: derived.secondaryTextColor,
        textTypedTextColorHover: derived.primaryHoverColor,
        textTypedTextColorActive: derived.primaryActiveColor,
        textTypedTextColorFocus: derived.primaryHoverColor,

        ghostTypedTextColor: derived.secondaryTextColor,
        ghostTypedTextColorHover: derived.primaryHoverColor,
        ghostTypedTextColorActive: derived.primaryActiveColor,
        ghostTypedTextColorFocus: derived.primaryHoverColor,

        borderColor: derived.borderOverlayColor,
        borderColorHover: derived.primaryHoverColor,
        borderColorActive: derived.primaryActiveColor,
        borderColorFocus: derived.primaryHoverColor,

        rippleColor: derived.primaryColor,

        iconColor: derived.secondaryTextColor
      },
      primary: {
        color: derived.primaryColor,
        colorHover: derived.primaryHoverColor,
        colorActive: derived.primaryActiveColor,
        colorFocus: derived.primaryHoverColor,
        textColor: derived.baseBackgroundColor
      },
      info: {
        color: derived.infoColor,
        colorHover: derived.infoHoverColor,
        colorActive: derived.infoActiveColor,
        colorFocus: derived.infoHoverColor,
        textColor: derived.baseBackgroundColor
      },
      success: {
        color: derived.successColor,
        colorHover: derived.successHoverColor,
        colorActive: derived.successActiveColor,
        colorFocus: derived.successHoverColor,
        textColor: derived.baseBackgroundColor
      },
      warning: {
        color: derived.warningColor,
        colorHover: derived.warningHoverColor,
        colorActive: derived.warningActiveColor,
        colorFocus: derived.warningHoverColor,
        textColor: derived.baseBackgroundColor
      },
      error: {
        color: derived.errorColor,
        colorHover: derived.errorHoverColor,
        colorActive: derived.errorActiveColor,
        colorFocus: derived.errorHoverColor,
        textColor: derived.baseBackgroundColor
      }
    }
  }
})

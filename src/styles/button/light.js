import create from '../_utils/create-component-base'
import commonVariables from '../_common-style/button'

export default create({
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables,
      borderRadius: base.borderRadius,
      disabledOpacity: derived.disabledOpacity,
      default: {
        color: 'transparent',
        hoverColor: 'transparent',
        activeColor: 'transparent',
        focusColor: 'transparent',

        textColor: derived.secondaryTextColor,
        hoverTextColor: derived.primaryHoverColor,
        activeTextColor: derived.primaryActiveColor,
        focusTextColor: derived.primaryHoverColor,

        textTypedTextColor: derived.secondaryTextColor,
        textTypedHoverTextColor: derived.primaryHoverColor,
        textTypedActiveTextColor: derived.primaryActiveColor,
        textTypedFocusTextColor: derived.primaryHoverColor,

        ghostTypedTextColor: derived.secondaryTextColor,
        ghostTypedHoverTextColor: derived.primaryHoverColor,
        ghostTypedActiveTextColor: derived.primaryActiveColor,
        ghostTypedFocusTextColor: derived.primaryHoverColor,

        borderColor: derived.borderColor,
        hoverBorderColor: derived.primaryHoverColor,
        activeBorderColor: derived.primaryActiveColor,
        focusBorderColor: derived.primaryHoverColor,

        rippleColor: derived.primaryColor,

        iconColor: derived.secondaryTextColor
      },
      primary: {
        color: derived.primaryColor,
        hoverColor: derived.primaryHoverColor,
        activeColor: derived.primaryActiveColor,
        focusColor: derived.primaryHoverColor,
        textColor: derived.baseBackgroundColor
      },
      info: {
        color: derived.infoColor,
        hoverColor: derived.infoHoverColor,
        activeColor: derived.infoActiveColor,
        focusColor: derived.infoHoverColor,
        textColor: derived.baseBackgroundColor
      },
      success: {
        color: derived.successColor,
        hoverColor: derived.successHoverColor,
        activeColor: derived.successActiveColor,
        focusColor: derived.successHoverColor,
        textColor: derived.baseBackgroundColor
      },
      warning: {
        color: derived.warningColor,
        hoverColor: derived.warningHoverColor,
        activeColor: derived.warningActiveColor,
        focusColor: derived.warningHoverColor,
        textColor: derived.baseBackgroundColor
      },
      error: {
        color: derived.errorColor,
        hoverColor: derived.errorHoverColor,
        activeColor: derived.errorActiveColor,
        focusColor: derived.errorHoverColor,
        textColor: derived.baseBackgroundColor
      }
    }
  }
})

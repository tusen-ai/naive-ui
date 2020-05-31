import lightScheme from '../../../_styles-in-js/lightStyleScheme.scss'
import darkScheme from '../../../_styles-in-js/darkStyleScheme.scss'

const light = {
  default: {
    color: lightScheme.baseBackgroundColor,
    hoverColor: lightScheme.baseBackgroundColor,
    activeColor: lightScheme.baseBackgroundColor,
    focusColor: lightScheme.baseBackgroundColor,

    textColor: lightScheme.secondaryTextColor,
    hoverTextColor: lightScheme.primaryHoverColor,
    activeTextColor: lightScheme.primaryActiveColor,
    focusTextColor: lightScheme.primaryHoverColor,

    textTypedTextColor: lightScheme.secondaryTextColor,
    textTypedHoverTextColor: lightScheme.primaryHoverColor,
    textTypedActiveTextColor: lightScheme.primaryActiveColor,
    textTypedFocusTextColor: lightScheme.primaryHoverColor,

    ghostTypedTextColor: lightScheme.secondaryTextColor,
    ghostTypedHoverTextColor: lightScheme.primaryHoverColor,
    ghostTypedActiveTextColor: lightScheme.primaryActiveColor,
    ghostTypedFocusTextColor: lightScheme.primaryHoverColor,

    borderColor: lightScheme.borderColor,
    hoverBorderColor: lightScheme.primaryHoverColor,
    activeBorderColor: lightScheme.primaryActiveColor,
    focusBorderColor: lightScheme.primaryHoverColor,

    rippleColor: lightScheme.primaryColor,

    tertiaryDepthIconColor: lightScheme.tertiaryTextColor,
    baseBackgroundColor: lightScheme.baseBackgroundColor
  },
  primary: {
    color: lightScheme.primaryColor,
    hoverColor: lightScheme.primaryHoverColor,
    activeColor: lightScheme.primaryActiveColor,
    focusColor: lightScheme.primaryHoverColor,
    textColor: lightScheme.baseBackgroundColor
  },
  info: {
    color: lightScheme.infoColor,
    hoverColor: lightScheme.infoHoverColor,
    activeColor: lightScheme.infoActiveColor,
    focusColor: lightScheme.infoHoverColor,
    textColor: lightScheme.baseBackgroundColor
  },
  success: {
    color: lightScheme.successColor,
    hoverColor: lightScheme.successHoverColor,
    activeColor: lightScheme.successActiveColor,
    focusColor: lightScheme.successHoverColor,
    textColor: lightScheme.baseBackgroundColor
  },
  warning: {
    color: lightScheme.warningColor,
    hoverColor: lightScheme.warningHoverColor,
    activeColor: lightScheme.warningActiveColor,
    focusColor: lightScheme.warningHoverColor,
    textColor: lightScheme.baseBackgroundColor
  },
  error: {
    color: lightScheme.errorColor,
    hoverColor: lightScheme.errorHoverColor,
    activeColor: lightScheme.errorActiveColor,
    focusColor: lightScheme.errorHoverColor,
    textColor: lightScheme.baseBackgroundColor
  }
}

const dark = {
  default: {
    color: 'transparent',
    hoverColor: 'transparent',
    activeColor: 'transparent',
    focusColor: 'transparent',

    textColor: darkScheme.secondaryTextColor,
    hoverTextColor: darkScheme.primaryHoverColor,
    activeTextColor: darkScheme.primaryActiveColor,
    focusTextColor: darkScheme.primaryHoverColor,

    textTypedTextColor: darkScheme.secondaryTextColor,
    textTypedHoverTextColor: darkScheme.primaryHoverColor,
    textTypedActiveTextColor: darkScheme.primaryActiveColor,
    textTypedFocusTextColor: darkScheme.primaryHoverColor,

    ghostTypedTextColor: darkScheme.secondaryTextColor,
    ghostTypedHoverTextColor: darkScheme.primaryHoverColor,
    ghostTypedActiveTextColor: darkScheme.primaryActiveColor,
    ghostTypedFocusTextColor: darkScheme.primaryHoverColor,

    borderColor: darkScheme.borderColor,
    hoverBorderColor: darkScheme.primaryHoverColor,
    activeBorderColor: darkScheme.primaryActiveColor,
    focusBorderColor: darkScheme.primaryHoverColor,

    rippleColor: darkScheme.primaryColor,

    tertiaryDepthIconColor: darkScheme.tertiaryTextColor,
    baseBackgroundColor: darkScheme.baseBackgroundColor
  },
  primary: {
    color: darkScheme.primaryColor,
    hoverColor: darkScheme.primaryHoverColor,
    activeColor: darkScheme.primaryActiveColor,
    focusColor: darkScheme.primaryHoverColor,
    textColor: darkScheme.baseBackgroundColor
  },
  info: {
    color: darkScheme.infoColor,
    hoverColor: darkScheme.infoHoverColor,
    activeColor: darkScheme.infoActiveColor,
    focusColor: darkScheme.infoHoverColor,
    textColor: darkScheme.baseBackgroundColor
  },
  success: {
    color: darkScheme.successColor,
    hoverColor: darkScheme.successHoverColor,
    activeColor: darkScheme.successActiveColor,
    focusColor: darkScheme.successHoverColor,
    textColor: darkScheme.baseBackgroundColor
  },
  warning: {
    color: darkScheme.warningColor,
    hoverColor: darkScheme.warningHoverColor,
    activeColor: darkScheme.warningActiveColor,
    focusColor: darkScheme.warningHoverColor,
    textColor: darkScheme.baseBackgroundColor
  },
  error: {
    color: darkScheme.errorColor,
    hoverColor: darkScheme.errorHoverColor,
    activeColor: darkScheme.errorActiveColor,
    focusColor: darkScheme.errorHoverColor,
    textColor: darkScheme.baseBackgroundColor
  }
}

export default {
  fallback: light,
  dark
}

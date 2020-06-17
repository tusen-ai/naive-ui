export default function createMergedStyleSchemes (globalSchemes, fallbackTheme) {
  const mergedStyleSchemes = {}
  for (const theme of Object.keys(globalSchemes)) {
    const scheme = globalSchemes[theme]
    if (theme === fallbackTheme) {
      mergedStyleSchemes.fallback = createStyleScheme(scheme)
    } else {
      mergedStyleSchemes[theme] = createStyleScheme(scheme)
    }
  }
  return mergedStyleSchemes
}

function createStyleScheme (scheme, theme) {
  if (theme !== 'dark') {
    return {
      default: {
        color: scheme.baseBackgroundColor,
        hoverColor: scheme.baseBackgroundColor,
        activeColor: scheme.baseBackgroundColor,
        focusColor: scheme.baseBackgroundColor,

        textColor: scheme.secondaryTextColor,
        hoverTextColor: scheme.primaryHoverColor,
        activeTextColor: scheme.primaryActiveColor,
        focusTextColor: scheme.primaryHoverColor,

        textTypedTextColor: scheme.secondaryTextColor,
        textTypedHoverTextColor: scheme.primaryHoverColor,
        textTypedActiveTextColor: scheme.primaryActiveColor,
        textTypedFocusTextColor: scheme.primaryHoverColor,

        ghostTypedTextColor: scheme.secondaryTextColor,
        ghostTypedHoverTextColor: scheme.primaryHoverColor,
        ghostTypedActiveTextColor: scheme.primaryActiveColor,
        ghostTypedFocusTextColor: scheme.primaryHoverColor,

        borderColor: scheme.borderColor,
        hoverBorderColor: scheme.primaryHoverColor,
        activeBorderColor: scheme.primaryActiveColor,
        focusBorderColor: scheme.primaryHoverColor,

        rippleColor: scheme.primaryColor,

        tertiaryDepthIconColor: scheme.tertiaryTextColor,
        baseBackgroundColor: scheme.baseBackgroundColor
      },
      primary: {
        color: scheme.primaryColor,
        hoverColor: scheme.primaryHoverColor,
        activeColor: scheme.primaryActiveColor,
        focusColor: scheme.primaryHoverColor,
        textColor: scheme.baseBackgroundColor
      },
      info: {
        color: scheme.infoColor,
        hoverColor: scheme.infoHoverColor,
        activeColor: scheme.infoActiveColor,
        focusColor: scheme.infoHoverColor,
        textColor: scheme.baseBackgroundColor
      },
      success: {
        color: scheme.successColor,
        hoverColor: scheme.successHoverColor,
        activeColor: scheme.successActiveColor,
        focusColor: scheme.successHoverColor,
        textColor: scheme.baseBackgroundColor
      },
      warning: {
        color: scheme.warningColor,
        hoverColor: scheme.warningHoverColor,
        activeColor: scheme.warningActiveColor,
        focusColor: scheme.warningHoverColor,
        textColor: scheme.baseBackgroundColor
      },
      error: {
        color: scheme.errorColor,
        hoverColor: scheme.errorHoverColor,
        activeColor: scheme.errorActiveColor,
        focusColor: scheme.errorHoverColor,
        textColor: scheme.baseBackgroundColor
      }
    }
  } else {
    return {
      default: {
        color: 'transparent',
        hoverColor: 'transparent',
        activeColor: 'transparent',
        focusColor: 'transparent',

        textColor: scheme.secondaryTextColor,
        hoverTextColor: scheme.primaryHoverColor,
        activeTextColor: scheme.primaryActiveColor,
        focusTextColor: scheme.primaryHoverColor,

        textTypedTextColor: scheme.secondaryTextColor,
        textTypedHoverTextColor: scheme.primaryHoverColor,
        textTypedActiveTextColor: scheme.primaryActiveColor,
        textTypedFocusTextColor: scheme.primaryHoverColor,

        ghostTypedTextColor: scheme.secondaryTextColor,
        ghostTypedHoverTextColor: scheme.primaryHoverColor,
        ghostTypedActiveTextColor: scheme.primaryActiveColor,
        ghostTypedFocusTextColor: scheme.primaryHoverColor,

        borderColor: scheme.borderColor,
        hoverBorderColor: scheme.primaryHoverColor,
        activeBorderColor: scheme.primaryActiveColor,
        focusBorderColor: scheme.primaryHoverColor,

        rippleColor: scheme.primaryColor,

        tertiaryDepthIconColor: scheme.tertiaryTextColor,
        baseBackgroundColor: scheme.baseBackgroundColor
      },
      primary: {
        color: scheme.primaryColor,
        hoverColor: scheme.primaryHoverColor,
        activeColor: scheme.primaryActiveColor,
        focusColor: scheme.primaryHoverColor,
        textColor: scheme.baseBackgroundColor
      },
      info: {
        color: scheme.infoColor,
        hoverColor: scheme.infoHoverColor,
        activeColor: scheme.infoActiveColor,
        focusColor: scheme.infoHoverColor,
        textColor: scheme.baseBackgroundColor
      },
      success: {
        color: scheme.successColor,
        hoverColor: scheme.successHoverColor,
        activeColor: scheme.successActiveColor,
        focusColor: scheme.successHoverColor,
        textColor: scheme.baseBackgroundColor
      },
      warning: {
        color: scheme.warningColor,
        hoverColor: scheme.warningHoverColor,
        activeColor: scheme.warningActiveColor,
        focusColor: scheme.warningHoverColor,
        textColor: scheme.baseBackgroundColor
      },
      error: {
        color: scheme.errorColor,
        hoverColor: scheme.errorHoverColor,
        activeColor: scheme.errorActiveColor,
        focusColor: scheme.errorHoverColor,
        textColor: scheme.baseBackgroundColor
      }
    }
  }
}

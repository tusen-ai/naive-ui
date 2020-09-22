import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'

export default create({
  theme: 'dark',
  name: 'Button',
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables(base, derived),
      opacityDisabled: derived.opacityDisabled,
      default: {
        color: 'transparent',
        colorHover: 'transparent',
        colorActive: 'transparent',
        colorFocus: 'transparent',

        textColor: derived.textColorSecondary,
        textColorHover: derived.primaryColorHover,
        textColorActive: derived.primaryColorPressed,
        textColorFocus: derived.primaryColorHover,

        textTypedTextColor: derived.textColorSecondary,
        textTypedTextColorHover: derived.primaryColorHover,
        textTypedTextColorActive: derived.primaryColorPressed,
        textTypedTextColorFocus: derived.primaryColorHover,

        ghostTypedTextColor: derived.textColorSecondary,
        ghostTypedTextColorHover: derived.primaryColorHover,
        ghostTypedTextColorActive: derived.primaryColorPressed,
        ghostTypedTextColorFocus: derived.primaryColorHover,

        borderColor: derived.borderColorOverlay,
        borderColorHover: derived.primaryColorHover,
        borderColorActive: derived.primaryColorPressed,
        borderColorFocus: derived.primaryColorHover,

        rippleColor: derived.primaryColor,

        iconColor: derived.textColorSecondary
      },
      primary: {
        color: derived.primaryColor,
        colorHover: derived.primaryColorHover,
        colorActive: derived.primaryColorPressed,
        colorFocus: derived.primaryColorHover,
        textColor: derived.baseColor
      },
      info: {
        color: derived.infoColor,
        colorHover: derived.infoColorHover,
        colorActive: derived.infoColorPressed,
        colorFocus: derived.infoColorHover,
        textColor: derived.baseColor
      },
      success: {
        color: derived.successColor,
        colorHover: derived.successHoverColor,
        colorActive: derived.successColorPressed,
        colorFocus: derived.successHoverColor,
        textColor: derived.baseColor
      },
      warning: {
        color: derived.warningColor,
        colorHover: derived.warningColorHover,
        colorActive: derived.warningColorPressed,
        colorFocus: derived.warningColorHover,
        textColor: derived.baseColor
      },
      error: {
        color: derived.errorColor,
        colorHover: derived.errorColorHover,
        colorActive: derived.errorColorPressed,
        colorFocus: derived.errorColorHover,
        textColor: derived.baseColor
      }
    }
  }
})

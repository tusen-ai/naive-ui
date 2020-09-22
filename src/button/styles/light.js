import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'

export default create({
  theme: 'light',
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
        textColorActive: derived.primaryColorActive,
        textColorFocus: derived.primaryColorHover,

        textTypedTextColor: derived.textColorSecondary,
        textTypedTextColorHover: derived.primaryColorHover,
        textTypedTextColorActive: derived.primaryColorActive,
        textTypedTextColorFocus: derived.primaryColorHover,

        ghostTypedTextColor: derived.textColorSecondary,
        ghostTypedTextColorHover: derived.primaryColorHover,
        ghostTypedTextColorActive: derived.primaryColorActive,
        ghostTypedTextColorFocus: derived.primaryColorHover,

        borderColor: derived.borderColor,
        borderColorHover: derived.primaryColorHover,
        borderColorActive: derived.primaryColorActive,
        borderColorFocus: derived.primaryColorHover,

        rippleColor: derived.primaryColor,

        iconColor: derived.textColorSecondary
      },
      primary: {
        color: derived.primaryColor,
        colorHover: derived.primaryColorHover,
        colorActive: derived.primaryColorActive,
        colorFocus: derived.primaryColorHover,
        textColor: derived.baseColor
      },
      info: {
        color: derived.infoColor,
        colorHover: derived.infoColorHover,
        colorActive: derived.infoColorActive,
        colorFocus: derived.infoColorHover,
        textColor: derived.baseColor
      },
      success: {
        color: derived.successColor,
        colorHover: derived.successHoverColor,
        colorActive: derived.successActiveColor,
        colorFocus: derived.successHoverColor,
        textColor: derived.baseColor
      },
      warning: {
        color: derived.warningColor,
        colorHover: derived.warningColorHover,
        colorActive: derived.warningColorActive,
        colorFocus: derived.warningColorHover,
        textColor: derived.baseColor
      },
      error: {
        color: derived.errorColor,
        colorHover: derived.errorColorHover,
        colorActive: derived.errorColorActive,
        colorFocus: derived.errorColorHover,
        textColor: derived.baseColor
      }
    }
  }
})

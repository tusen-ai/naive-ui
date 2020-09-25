import create from '../../styles/_utils/create-component-base'
import commonVariables from './_common'

export default create({
  theme: 'dark',
  name: 'Button',
  getDerivedVariables ({ base, derived }) {
    return {
      ...commonVariables(base, derived),
      opacityDisabled: derived.opacityDisabled,
      // default type
      color: 'transparent',
      colorHover: 'transparent',
      colorPressed: 'transparent',
      colorFocus: 'transparent',
      colorDisabled: 'transparent',

      textColor: derived.textColorSecondary,
      textColorHover: derived.primaryColorHover,
      textColorPressed: derived.primaryColorPressed,
      textColorFocus: derived.primaryColorHover,
      textColorDisabled: derived.textColorSecondary,

      textColorText: derived.textColorSecondary,
      textColorTextHover: derived.primaryColorHover,
      textColorTextPressed: derived.primaryColorPressed,
      textColorTextFocus: derived.primaryColorHover,
      textColorTextDisabled: derived.textColorSecondary,

      textColorGhost: derived.textColorSecondary,
      textColorGhostHover: derived.primaryColorHover,
      textColorGhostPressed: derived.primaryColorPressed,
      textColorGhostFocus: derived.primaryColorHover,
      textColorGhostDisabled: derived.textColorSecondary,

      borderColor: derived.borderColorOverlay,
      borderColorHover: derived.primaryColorHover,
      borderColorPressed: derived.primaryColorPressed,
      borderColorFocus: derived.primaryColorHover,
      borderColorDisabled: derived.borderColorOverlay,

      rippleColor: derived.primaryColor,

      iconColor: derived.textColorSecondary,

      // type primary
      colorPrimary: derived.primaryColor,
      colorPrimaryHover: derived.primaryColorHover,
      colorPrimaryPressed: derived.primaryColorPressed,
      colorPrimaryFocus: derived.primaryColorHover,
      colorPrimaryDisabled: derived.primaryColor,
      textColorPrimary: derived.baseColor,
      textColorPrimaryDisabled: derived.baseColor,
      textColorPrimaryGhostDisabled: derived.primaryColor,
      textColorPrimaryTextDisabled: derived.primaryColor,
      borderColorPrimaryDisabled: derived.primaryColor,
      // type info
      colorInfo: derived.infoColor,
      colorInfoHover: derived.infoColorHover,
      colorInfoPressed: derived.infoColorPressed,
      colorInfoFocus: derived.infoColorHover,
      colorInfoDisabled: derived.infoColor,
      textColorInfo: derived.baseColor,
      textColorInfoDisabled: derived.baseColor,
      textColorInfoGhostDisabled: derived.infoColor,
      textColorInfoTextDisabled: derived.infoColor,
      borderColorInfoDisabled: derived.infoColor,
      // type success
      colorSuccess: derived.successColor,
      colorSuccessHover: derived.successHoverColor,
      colorSuccessPressed: derived.successColorPressed,
      colorSuccessFocus: derived.successHoverColor,
      colorSuccessDisabled: derived.successColor,
      textColorSuccess: derived.baseColor,
      textColorSuccessDisabled: derived.baseColor,
      textColorSuccessGhostDisabled: derived.successColor,
      textColorSuccessTextDisabled: derived.successColor,
      borderColorSuccessDisabled: derived.successColor,
      // type warning
      colorWarning: derived.warningColor,
      colorWarningHover: derived.warningColorHover,
      colorWarningPressed: derived.warningColorPressed,
      colorWarningFocus: derived.warningColorHover,
      colorWarningDisabled: derived.warningColor,
      textColorWarning: derived.baseColor,
      textColorWarningDisabled: derived.baseColor,
      textColorWarningGhostDisabled: derived.warningColor,
      textColorWarningTextDisabled: derived.warningColor,
      borderColorWarningDisabled: derived.warningColor,
      // type error
      colorError: derived.errorColor,
      colorErrorHover: derived.errorColorHover,
      colorErrorPressed: derived.errorColorPressed,
      colorErrorFocus: derived.errorColorHover,
      colorErrorDisabled: derived.errorColor,
      textColorError: derived.baseColor,
      textColorErrorDisabled: derived.baseColor,
      textColorErrorGhostDisabled: derived.errorColor,
      textColorErrorTextDisabled: derived.errorColor,
      borderColorErrorDisabled: derived.errorColor
    }
  }
})

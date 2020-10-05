import create from '../../_styles/utils/create-component-base'
import avatarStyle from '../../avatar/styles/dark'

export default create({
  name: 'Notification',
  theme: 'light',
  peer: [
    avatarStyle
  ],
  getDerivedVariables ({ base, derived }) {
    const {
      textColorSecondary,
      successColor,
      infoColor,
      warningColor,
      errorColor,
      popoverColor,
      closeColor,
      closeColorHover,
      textColorPrimaryOverlay,
      textColorTertiaryOverlay
    } = derived
    const {
      borderRadius,
      fontWeightStrong
    } = base
    return {
      borderRadius,
      headerFontWeight: fontWeightStrong,
      iconColorSuccess: successColor,
      iconColorInfo: infoColor,
      iconColorWarning: warningColor,
      iconColorError: errorColor,
      color: popoverColor,
      textColor: textColorSecondary,
      closeColor: closeColor,
      closeColorHover: closeColorHover,
      closeColorActive: closeColor,
      headerTextColor: textColorPrimaryOverlay,
      contentTextColor: textColorSecondary,
      descriptionTextColor: textColorTertiaryOverlay,
      actionTextColor: textColorSecondary
    }
  }
})

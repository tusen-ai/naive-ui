import create from '../../styles/_utils/create-component-base'
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
      closeHoverColor,
      textColorPrimaryOverlay,
      textColorTertiaryOverlay
    } = derived
    const {
      borderRadius,
      strongFontWeight
    } = base
    return {
      borderRadius,
      headerFontWeight: strongFontWeight,
      iconColorSuccess: successColor,
      iconColorInfo: infoColor,
      iconColorWarning: warningColor,
      iconColorError: errorColor,
      color: popoverColor,
      textColor: textColorSecondary,
      closeColor: closeColor,
      closeColorHover: closeHoverColor,
      closeColorActive: closeColor,
      headerTextColor: textColorPrimaryOverlay,
      contentTextColor: textColorSecondary,
      descriptionTextColor: textColorTertiaryOverlay,
      actionTextColor: textColorSecondary
    }
  }
})

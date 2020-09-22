import create from '../../styles/_utils/create-component-base'
import avatarStyle from '../../avatar/styles/dark'

export default create({
  name: 'Notification',
  theme: 'dark',
  peer: [
    avatarStyle
  ],
  getDerivedVariables ({ base, derived }) {
    const {
      textColorSecondaryOverlay,
      successColor,
      infoColor,
      warningColor,
      errorColor,
      popoverColor,
      closeOverlayColor,
      closeHoverOverlayColor,
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
      textColor: textColorSecondaryOverlay,
      closeColor: closeOverlayColor,
      closeColorHover: closeHoverOverlayColor,
      closeColorActive: closeOverlayColor,
      headerTextColor: textColorPrimaryOverlay,
      contentTextColor: textColorSecondaryOverlay,
      descriptionTextColor: textColorTertiaryOverlay,
      actionTextColor: textColorSecondaryOverlay
    }
  }
})

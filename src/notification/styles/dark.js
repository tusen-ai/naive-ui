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
      closeColorOverlay,
      colorColorHoverOverlay,
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
      textColor: textColorSecondaryOverlay,
      closeColor: closeColorOverlay,
      closeColorHover: colorColorHoverOverlay,
      closeColorActive: closeColorOverlay,
      headerTextColor: textColorPrimaryOverlay,
      contentTextColor: textColorSecondaryOverlay,
      descriptionTextColor: textColorTertiaryOverlay,
      actionTextColor: textColorSecondaryOverlay
    }
  }
})

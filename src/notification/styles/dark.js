import create from '../../_styles/utils/create-component-base'
import avatarStyle from '../../avatar/styles/dark'

export default create({
  name: 'Notification',
  theme: 'dark',
  peer: [
    avatarStyle
  ],
  getDerivedVariables ({ base, derived }) {
    const {
      textColor2Overlay,
      successColor,
      infoColor,
      warningColor,
      errorColor,
      popoverColor,
      closeColorOverlay,
      colorColorHoverOverlay,
      textColor1Overlay,
      textColor3Overlay
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
      textColor: textColor2Overlay,
      closeColor: closeColorOverlay,
      closeColorHover: colorColorHoverOverlay,
      closeColorPressed: closeColorOverlay,
      headerTextColor: textColor1Overlay,
      contentTextColor: textColor2Overlay,
      descriptionTextColor: textColor3Overlay,
      actionTextColor: textColor2Overlay
    }
  }
})

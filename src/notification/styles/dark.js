import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'
import { avatarDark } from '../../avatar/styles'
import { scrollbarDark } from '../../scrollbar/styles'
import { iconDark } from '../../icon/styles'

export default create({
  name: 'Notification',
  theme: 'dark',
  peer: [baseDark, iconDark, avatarDark, scrollbarDark],
  getLocalVars (vars) {
    const {
      textColor2Overlay,
      successColor,
      infoColor,
      warningColor,
      errorColor,
      popoverColor,
      closeColorOverlay,
      closeColorHoverOverlay,
      textColor1Overlay,
      textColor3Overlay,
      borderRadius,
      fontWeightStrong,
      boxShadow2,
      lineHeight,
      fontSize
    } = vars
    return {
      borderRadius,
      lineHeight,
      fontSize,
      headerFontWeight: fontWeightStrong,
      iconColorSuccess: successColor,
      iconColorInfo: infoColor,
      iconColorWarning: warningColor,
      iconColorError: errorColor,
      color: popoverColor,
      textColor: textColor2Overlay,
      closeColor: closeColorOverlay,
      closeColorHover: closeColorHoverOverlay,
      closeColorPressed: closeColorOverlay,
      headerTextColor: textColor1Overlay,
      contentTextColor: textColor2Overlay,
      descriptionTextColor: textColor3Overlay,
      actionTextColor: textColor2Overlay,
      boxShadow: boxShadow2
    }
  }
})

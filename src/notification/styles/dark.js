import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'
import { avatarDark } from '../../avatar'
import { scrollbarDark } from '../../scrollbar'
import { iconDark } from '../../icon'

export default create({
  name: 'Notification',
  theme: 'dark',
  peer: [
    baseDark,
    iconDark,
    avatarDark,
    scrollbarDark
  ],
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
      fontWeightStrong
    } = vars
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
      closeColorHover: closeColorHoverOverlay,
      closeColorPressed: closeColorOverlay,
      headerTextColor: textColor1Overlay,
      contentTextColor: textColor2Overlay,
      descriptionTextColor: textColor3Overlay,
      actionTextColor: textColor2Overlay
    }
  }
})

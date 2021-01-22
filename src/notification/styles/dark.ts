import { scrollbarDark } from '../../scrollbar/styles'
import { commonDark } from '../../_styles/new-common'
import type { NotificationTheme } from './light'

const notificationDark: NotificationTheme = {
  name: 'Notification',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark
  },
  self (vars) {
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
      iconColor: textColor2Overlay,
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
      descriptionTextColor: textColor3Overlay,
      actionTextColor: textColor2Overlay,
      boxShadow: boxShadow2
    }
  }
}

export default notificationDark

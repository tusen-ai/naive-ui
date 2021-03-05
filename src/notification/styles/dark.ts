import { scrollbarDark } from '../../scrollbar/styles'
import { commonDark } from '../../_styles/common'
import commonVars from './_common'
import type { NotificationTheme } from './light'

const notificationDark: NotificationTheme = {
  name: 'Notification',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark
  },
  self (vars) {
    const {
      textColor2,
      successColor,
      infoColor,
      warningColor,
      errorColor,
      popoverColor,
      closeColor,
      closeColorHover,
      textColor1,
      textColor3,
      borderRadius,
      fontWeightStrong,
      boxShadow2,
      lineHeight,
      fontSize
    } = vars
    return {
      ...commonVars,
      borderRadius,
      lineHeight,
      fontSize,
      headerFontWeight: fontWeightStrong,
      iconColor: textColor2,
      iconColorSuccess: successColor,
      iconColorInfo: infoColor,
      iconColorWarning: warningColor,
      iconColorError: errorColor,
      color: popoverColor,
      textColor: textColor2,
      closeColor: closeColor,
      closeColorHover: closeColorHover,
      closeColorPressed: closeColor,
      headerTextColor: textColor1,
      descriptionTextColor: textColor3,
      actionTextColor: textColor2,
      boxShadow: boxShadow2
    }
  }
}

export default notificationDark

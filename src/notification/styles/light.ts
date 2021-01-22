import { scrollbarLight } from '../../scrollbar/styles'
import { commonLight } from '../../_styles/new-common'
import type { ThemeCommonVars } from '../../_styles/new-common'
import { createTheme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const {
    textColor2,
    successColor,
    infoColor,
    warningColor,
    errorColor,
    popoverColor,
    closeColor,
    closeColorHover,
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
    headerTextColor: textColor1Overlay,
    descriptionTextColor: textColor3Overlay,
    actionTextColor: textColor2,
    boxShadow: boxShadow2
  }
}

export type NotificationThemeVars = ReturnType<typeof self>

const notificationLight = createTheme({
  name: 'Notification',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight
  },
  self
})

export default notificationLight
export type NotificationTheme = typeof notificationLight

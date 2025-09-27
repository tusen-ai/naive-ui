import type { ThemeCommonVars } from '../../_styles/common'
import { scrollbarLight } from '../../_internal/scrollbar/styles'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import commonVars from './_common'

export function self(vars: ThemeCommonVars) {
  const {
    textColor2,
    successColor,
    infoColor,
    warningColor,
    errorColor,
    popoverColor,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeColorHover,
    closeColorPressed,
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
    colorInfo: popoverColor,
    colorSuccess: popoverColor,
    colorError: popoverColor,
    colorWarning: popoverColor,
    textColor: textColor2,
    textColorInfo: textColor2,
    textColorSuccess: textColor2,
    textColorWarning: textColor2,
    textColorError: textColor2,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeBorderRadius: borderRadius,
    closeColorHover,
    closeColorPressed,
    headerTextColor: textColor1,
    headerTextColorInfo: textColor1,
    headerTextColorSuccess: textColor1,
    headerTextColorWarning: textColor1,
    headerTextColorError: textColor1,
    descriptionTextColor: textColor3,
    descriptionTextColorInfo: textColor3,
    descriptionTextColorSuccess: textColor3,
    descriptionTextColorWarning: textColor3,
    descriptionTextColorError: textColor3,
    actionTextColor: textColor2,
    actionTextColorInfo: textColor2,
    actionTextColorSuccess: textColor2,
    actionTextColorWarning: textColor2,
    actionTextColorError: textColor2,
    boxShadow: boxShadow2,
    border: '0',
    borderInfo: '0',
    borderSuccess: '0',
    borderWarning: '0',
    borderError: '0'
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

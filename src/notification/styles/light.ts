import type { ScrollbarTheme } from '../../_internal/scrollbar/styles'
import type { ExtractThemeOverrides, Theme } from '../../_mixins'
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
    textColor: textColor2,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeBorderRadius: borderRadius,
    closeColorHover,
    closeColorPressed,
    headerTextColor: textColor1,
    descriptionTextColor: textColor3,
    actionTextColor: textColor2,
    boxShadow: boxShadow2
  }
}

export interface NotificationThemeVars extends ReturnType<typeof self> {}

const notificationLight: NotificationTheme = createTheme({
  name: 'Notification',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight
  },
  self
})

export interface NotificationTheme extends Theme<
  'Notification',
  NotificationThemeVars,
  {
    Scrollbar: ScrollbarTheme
  }
> {}

export interface NotificationThemeOverrides extends ExtractThemeOverrides<NotificationTheme> {}

export default notificationLight

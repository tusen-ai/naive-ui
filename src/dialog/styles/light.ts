import commonVars from './_common'
import { buttonLight } from '../../button/styles'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { createTheme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const {
    textColor1,
    textColor2,
    modalColor,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeColorHover,
    closeColorPressed,
    infoColor,
    successColor,
    warningColor,
    errorColor,
    primaryColor,
    dividerColor,
    borderRadius,
    fontWeightStrong,
    lineHeight,
    fontSize
  } = vars
  return {
    ...commonVars,
    fontSize,
    lineHeight,
    border: `1px solid ${dividerColor}`,
    titleTextColor: textColor1,
    textColor: textColor2,
    color: modalColor,
    closeColorHover,
    closeColorPressed,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeBorderRadius: borderRadius,
    iconColor: primaryColor,
    iconColorInfo: infoColor,
    iconColorSuccess: successColor,
    iconColorWarning: warningColor,
    iconColorError: errorColor,
    borderRadius,
    titleFontWeight: fontWeightStrong
  }
}

export type DialogThemeVars = ReturnType<typeof self>

const dialogLight = createTheme({
  name: 'Dialog',
  common: commonLight,
  peers: {
    Button: buttonLight
  },
  self
})

export default dialogLight
export type DialogTheme = typeof dialogLight

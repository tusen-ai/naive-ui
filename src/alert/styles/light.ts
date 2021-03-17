import { changeColor, composite } from 'seemly'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins/use-theme'
import commonVars from './_common'

const self = (vars: ThemeCommonVars) => {
  const {
    lineHeight,
    borderRadius,
    fontWeightStrong,
    baseColor,
    dividerColor,
    actionColor,
    textColor1,
    textColor2,
    closeColor,
    closeColorHover,
    closeColorPressed,
    infoColor,
    successColor,
    warningColor,
    errorColor,
    fontSize
  } = vars
  return {
    ...commonVars,
    fontSize,
    lineHeight,
    titleFontWeight: fontWeightStrong,
    borderRadius,
    border: `1px solid ${dividerColor}`,
    color: actionColor,
    titleTextColor: textColor1,
    iconColor: textColor2,
    contentTextColor: textColor2,
    closeColor,
    closeColorHover,
    closeColorPressed,
    borderInfo: `1px solid ${composite(
      baseColor,
      changeColor(infoColor, { alpha: 0.25 })
    )}`,
    colorInfo: composite(baseColor, changeColor(infoColor, { alpha: 0.08 })),
    titleTextColorInfo: textColor1,
    iconColorInfo: infoColor,
    contentTextColorInfo: textColor2,
    closeColorInfo: closeColor,
    closeColorHoverInfo: closeColorHover,
    closeColorPressedInfo: closeColorPressed,
    borderSuccess: `1px solid ${composite(
      baseColor,
      changeColor(successColor, { alpha: 0.25 })
    )}`,
    colorSuccess: composite(
      baseColor,
      changeColor(successColor, { alpha: 0.08 })
    ),
    titleTextColorSuccess: textColor1,
    iconColorSuccess: successColor,
    contentTextColorSuccess: textColor2,
    closeColorSuccess: closeColor,
    closeColorHoverSuccess: closeColorHover,
    closeColorPressedSuccess: closeColorPressed,
    borderWarning: `1px solid ${composite(
      baseColor,
      changeColor(warningColor, { alpha: 0.33 })
    )}`,
    colorWarning: composite(
      baseColor,
      changeColor(warningColor, { alpha: 0.08 })
    ),
    titleTextColorWarning: textColor1,
    iconColorWarning: warningColor,
    contentTextColorWarning: textColor2,
    closeColorWarning: closeColor,
    closeColorHoverWarning: closeColorHover,
    closeColorPressedWarning: closeColorPressed,
    borderError: `1px solid ${composite(
      baseColor,
      changeColor(errorColor, { alpha: 0.25 })
    )}`,
    colorError: composite(baseColor, changeColor(errorColor, { alpha: 0.08 })),
    titleTextColorError: textColor1,
    iconColorError: errorColor,
    contentTextColorError: textColor2,
    closeColorError: closeColor,
    closeColorHoverError: closeColorHover,
    closeColorPressedError: closeColorPressed
  }
}

export type AlertThemeVars = ReturnType<typeof self>

const alertLight: Theme<'Alert', AlertThemeVars> = {
  name: 'Alert',
  common: commonLight,
  self
}

export default alertLight
export type AlertTheme = typeof alertLight

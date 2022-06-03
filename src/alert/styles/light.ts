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
    closeColorHover,
    closeColorPressed,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
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
    closeBorderRadius: borderRadius,
    closeColorHover,
    closeColorPressed,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    borderInfo: `1px solid ${composite(
      baseColor,
      changeColor(infoColor, { alpha: 0.25 })
    )}`,
    colorInfo: composite(baseColor, changeColor(infoColor, { alpha: 0.08 })),
    titleTextColorInfo: textColor1,
    iconColorInfo: infoColor,
    contentTextColorInfo: textColor2,
    closeColorHoverInfo: closeColorHover,
    closeColorPressedInfo: closeColorPressed,
    closeIconColorInfo: closeIconColor,
    closeIconColorHoverInfo: closeIconColorHover,
    closeIconColorPressedInfo: closeIconColorPressed,
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
    closeColorHoverSuccess: closeColorHover,
    closeColorPressedSuccess: closeColorPressed,
    closeIconColorSuccess: closeIconColor,
    closeIconColorHoverSuccess: closeIconColorHover,
    closeIconColorPressedSuccess: closeIconColorPressed,
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
    closeColorHoverWarning: closeColorHover,
    closeColorPressedWarning: closeColorPressed,
    closeIconColorWarning: closeIconColor,
    closeIconColorHoverWarning: closeIconColorHover,
    closeIconColorPressedWarning: closeIconColorPressed,
    borderError: `1px solid ${composite(
      baseColor,
      changeColor(errorColor, { alpha: 0.25 })
    )}`,
    colorError: composite(baseColor, changeColor(errorColor, { alpha: 0.08 })),
    titleTextColorError: textColor1,
    iconColorError: errorColor,
    contentTextColorError: textColor2,
    closeColorHoverError: closeColorHover,
    closeColorPressedError: closeColorPressed,
    closeIconColorError: closeIconColor,
    closeIconColorHoverError: closeIconColorHover,
    closeIconColorPressedError: closeIconColorPressed
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

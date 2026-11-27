import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { changeColor } from 'seemly'
import { commonLight } from '../../_styles/common'

function self(vars: ThemeCommonVars) {
  const { borderRadius, cardColor, textColor2, primaryColor } = vars
  return {
    borderRadius,
    maskColor: changeColor(cardColor, { alpha: 0.96 }),
    statusTextColor: textColor2,
    refreshTextColor: primaryColor
  }
}

export interface QrCodeThemeVars extends ReturnType<typeof self> {}

const themeLight: QrCodeTheme = {
  name: 'QrCode',
  common: commonLight,
  self
}

export interface QrCodeTheme extends Theme<'QrCode', QrCodeThemeVars> {}

export interface QrCodeThemeOverrides extends ExtractThemeOverrides<QrCodeTheme> {}

export default themeLight

import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'

function self(vars: ThemeCommonVars) {
  return {
    borderRadius: vars.borderRadius
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

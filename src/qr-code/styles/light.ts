import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { type Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  return {
    borderRadius: vars.borderRadius
  }
}

export type QrCodeThemeVars = ReturnType<typeof self>

const themeLight: Theme<'QrCode', QrCodeThemeVars> = {
  name: 'QrCode',
  common: commonLight,
  self
}

export default themeLight
export type QrCodeTheme = typeof themeLight

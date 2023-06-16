import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { type Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  return {}
}

export type QrcodeThemeVars = ReturnType<typeof self>

const themeLight: Theme<'Qrcode', QrcodeThemeVars> = {
  name: 'Qrcode',
  common: commonLight,
  self
}

export default themeLight
export type QrcodeTheme = typeof themeLight

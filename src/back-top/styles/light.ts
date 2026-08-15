import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'
import commonVariables from './_common'

function self(vars: ThemeCommonVars) {
  const { popoverColor, textColor2, primaryColorHover, primaryColorPressed }
    = vars
  return {
    ...commonVariables,
    color: popoverColor,
    textColor: textColor2,
    iconColor: textColor2,
    iconColorHover: primaryColorHover,
    iconColorPressed: primaryColorPressed,
    boxShadow: '0 2px 8px 0px rgba(0, 0, 0, .12)',
    boxShadowHover: '0 2px 12px 0px rgba(0, 0, 0, .18)',
    boxShadowPressed: '0 2px 12px 0px rgba(0, 0, 0, .18)'
  }
}

export interface BackTopThemeVars extends ReturnType<typeof self> {}

const backTopLight: BackTopTheme = {
  name: 'BackTop',
  common: commonLight,
  self
}

export interface BackTopTheme extends Theme<'BackTop', BackTopThemeVars> {}

export interface BackTopThemeOverrides extends ExtractThemeOverrides<BackTopTheme> {}

export default backTopLight

import commonVariables from './_common'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const {
    popoverColor,
    textColor2,
    primaryColorHover,
    primaryColorPressed
  } = vars
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

export type BackTopThemeVars = ReturnType<typeof self>

const backTopLight: Theme<'BackTop', BackTopThemeVars> = {
  name: 'BackTop',
  common: commonLight,
  self
}

export default backTopLight
export type BackTopTheme = typeof backTopLight

import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const { successColor, errorColor } = vars
  return {
    colorError: errorColor,
    colorLoading: successColor,
    height: '2px'
  }
}

export type LoadingBarThemeVars = ReturnType<typeof self>

const loadingBarLight: Theme<LoadingBarThemeVars> = {
  name: 'LoadingBar',
  common: commonLight,
  self
}

export default loadingBarLight
export type LoadingBarTheme = typeof loadingBarLight

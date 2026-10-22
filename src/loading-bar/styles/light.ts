import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'

function self(vars: ThemeCommonVars) {
  const { primaryColor, errorColor } = vars
  return {
    colorError: errorColor,
    colorLoading: primaryColor,
    height: '2px'
  }
}

export interface LoadingBarThemeVars extends ReturnType<typeof self> {}

const loadingBarLight: LoadingBarTheme = {
  name: 'LoadingBar',
  common: commonLight,
  self
}

export interface LoadingBarTheme extends Theme<
  'LoadingBar',
  LoadingBarThemeVars
> {}

export interface LoadingBarThemeOverrides extends ExtractThemeOverrides<LoadingBarTheme> {}

export default loadingBarLight

import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'
import commonVars from './_common'

export function self(vars: ThemeCommonVars) {
  const {
    textColorDisabled,
    iconColor,
    textColor2,
    fontSizeTiny,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeHuge
  } = vars
  return {
    ...commonVars,
    fontSizeTiny,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeHuge,
    textColor: textColorDisabled,
    iconColor,
    extraTextColor: textColor2
  }
}

export interface EmptyThemeVars extends ReturnType<typeof self> {}

const emptyLight: EmptyTheme = {
  name: 'Empty',
  common: commonLight,
  self
}

export interface EmptyTheme extends Theme<'Empty', EmptyThemeVars> {}

export interface EmptyThemeOverrides extends ExtractThemeOverrides<EmptyTheme> {}

export default emptyLight

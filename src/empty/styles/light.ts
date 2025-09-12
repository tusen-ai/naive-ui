import type { Theme } from '../../_mixins'
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

export type EmptyThemeVars = ReturnType<typeof self>

const emptyLight: Theme<'Empty', EmptyThemeVars> = {
  name: 'Empty',
  common: commonLight,
  self
}

export default emptyLight
export type EmptyTheme = typeof emptyLight

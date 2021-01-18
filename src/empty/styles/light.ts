import commonVars from './_common'
import { commonLight } from '../../_styles/new-common'
import type { ThemeCommonVars } from '../../_styles/new-common'
import type { Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const {
    textColorDisabled,
    iconColorOverlay,
    textColor2,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeHuge
  } = vars
  return {
    ...commonVars,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeHuge,
    textColor: textColorDisabled,
    iconColor: iconColorOverlay,
    extraTextColor: textColor2
  }
}

export type EmptyThemeVars = ReturnType<typeof self>

const emptyLight: Theme<EmptyThemeVars> = {
  name: 'Empty',
  common: commonLight,
  self
}

export default emptyLight
export type EmptyTheme = typeof emptyLight

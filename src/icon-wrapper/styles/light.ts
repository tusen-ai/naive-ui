import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'

export function self(vars: ThemeCommonVars) {
  const { primaryColor, baseColor } = vars
  return {
    color: primaryColor,
    iconColor: baseColor
  }
}

export interface IconWrapperThemeVars extends ReturnType<typeof self> {}

const iconWrapperLight: IconWrapperTheme = {
  name: 'IconWrapper',
  common: commonLight,
  self
}

export interface IconWrapperTheme extends Theme<
  'IconWrapper',
  IconWrapperThemeVars
> {}

export interface IconWrapperThemeOverrides extends ExtractThemeOverrides<IconWrapperTheme> {}

export default iconWrapperLight

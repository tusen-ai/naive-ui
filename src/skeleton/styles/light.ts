import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { commonLight } from '../../_styles/common'

function self(vars: ThemeCommonVars) {
  const { heightSmall, heightMedium, heightLarge, borderRadius } = vars
  return {
    color: '#eee',
    colorEnd: '#ddd',
    borderRadius,
    heightSmall,
    heightMedium,
    heightLarge
  }
}

export interface SkeletonThemeVars extends ReturnType<typeof self> {}

export const skeletonLight: SkeletonTheme = {
  name: 'Skeleton',
  common: commonLight,
  self
}

export interface SkeletonTheme extends Theme<'Skeleton', SkeletonThemeVars> {}

export interface SkeletonThemeOverrides extends ExtractThemeOverrides<SkeletonTheme> {}

import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import { commonLight } from '../../_styles/common'

export function self() {
  return {}
}

export interface MarqueeThemeVars extends ReturnType<typeof self> {}

const marqueeLight: MarqueeTheme = {
  name: 'Marquee',
  common: commonLight,
  self
}

export interface MarqueeTheme extends Theme<'Marquee', MarqueeThemeVars> {}

export interface MarqueeThemeOverrides extends ExtractThemeOverrides<MarqueeTheme> {}

export default marqueeLight

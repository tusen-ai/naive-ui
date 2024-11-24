import { commonLight } from '../../_styles/common'
import type { Theme } from '../../_mixins'

export function self() {
  return {}
}

export type MarqueeThemeVars = ReturnType<typeof self>

const marqueeLight: Theme<'Marquee', MarqueeThemeVars> = {
  name: 'Marquee',
  common: commonLight,
  self
}

export default marqueeLight
export type MarqueeTheme = typeof marqueeLight

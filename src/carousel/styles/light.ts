import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { Theme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  return {}
}

export type CarouselThemeVars = ReturnType<typeof self>

const carouselLight: Theme<'Carousel', CarouselThemeVars> = {
  name: 'Carousel',
  common: commonLight,
  self
}

export default carouselLight
export type CarouselTheme = typeof carouselLight

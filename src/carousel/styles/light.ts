import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import { commonLight } from '../../_styles/common'

export function self() {
  return {
    dotSize: '8px',
    dotColor: 'rgba(255, 255, 255, .3)',
    dotColorActive: 'rgba(255, 255, 255, 1)',
    dotColorFocus: 'rgba(255, 255, 255, .5)',
    dotLineWidth: '16px',
    dotLineWidthActive: '24px',
    arrowColor: '#eee'
  }
}

export interface CarouselThemeVars extends ReturnType<typeof self> {}

const carouselLight: CarouselTheme = {
  name: 'Carousel',
  common: commonLight,
  self
}

export interface CarouselTheme extends Theme<'Carousel', CarouselThemeVars> {}

export interface CarouselThemeOverrides extends ExtractThemeOverrides<CarouselTheme> {}

export default carouselLight

import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { Theme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  return {
    dotSize: '8px',
    dotRadius: '50%',
    lineWidth: 12,
    lineHeight: 4,
    lineRadius: '3px',
    dotMargin: '12px',
    dotColor: 'rgba(255, 255, 255, .3)',
    dotColorActive: 'rgba(255, 255, 255, 1)',
    outerDotColor: 'rgb(201, 205, 212, .3)',
    outerDotColorActive: 'rgb(201, 205, 212)',
    arrowColor: 'rgba(255, 255, 255, .6)'
  }
}

export type CarouselThemeVars = ReturnType<typeof self>

const carouselLight: Theme<'Carousel', CarouselThemeVars> = {
  name: 'Carousel',
  common: commonLight,
  self
}

export default carouselLight
export type CarouselTheme = typeof carouselLight

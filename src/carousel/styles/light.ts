import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { Theme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const lineWidth = 12
  const lineHeight = 4
  return {
    dotSize: '8px',
    dotsSliderWidth: `${lineWidth * 4}px`,
    dotsSliderHeight: `${lineHeight}px`,
    dotRadius: '50%',
    lineWidth: `${lineWidth}px`,
    lineHeight: `${lineHeight}px`,
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

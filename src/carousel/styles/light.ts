import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { Theme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  return {
    dotSize: '8px',
    dotColor: 'rgba(255, 255, 255, .3)',
    dotColorActive: 'rgba(255, 255, 255, 1)',
    dotColorFocus: 'rgba(255, 255, 255, .6)',
    dotLineSize: '10px',
    dotLineSizeActive: '16px',
    dotProgressSize: '6px',
    dotProgressColor: 'rgba(235, 235, 235, 1)',
    dotProgressColorActive: commonLight.primaryColor,
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

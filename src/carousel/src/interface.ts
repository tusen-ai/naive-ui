import { InjectionKey } from 'vue'

export type Direction = 'horizontal' | 'vertical'

export interface CarouselSlideInjection {
  slideTo: (index: number) => void
  slidePrev: () => void
  slideNext: () => void
  isPrev: (slide: number | HTMLElement) => boolean
  isNext: (slide: number | HTMLElement) => boolean
  isActive: (slide: number | HTMLElement) => boolean
  getSlideIndex: (slide: number | HTMLElement) => number
  getDisplayIndex: (slide: number | HTMLElement) => number
  getSlideStyle: (slide: HTMLElement) => any
  addSlide: (slide: HTMLElement) => void
  removeSlide: (slide: HTMLElement) => void
}
export const carouselSlideInjectionKey: InjectionKey<CarouselSlideInjection> = Symbol(
  'carouselSlide'
)

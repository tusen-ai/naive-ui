import type { InjectionKey } from 'vue'

export interface CarouselMethodsInjection {
  slideTo: (index: number) => void
  slidePrev: () => void
  slideNext: () => void
  isPrev: (slide: number | HTMLElement) => boolean
  isNext: (slide: number | HTMLElement) => boolean
  isActive: (slide: number | HTMLElement) => boolean
  isPrevDisabled: () => boolean
  isNextDisabled: () => boolean
  getSlideIndex: (slide: number | HTMLElement) => number
  getSlideStyle: (slide: HTMLElement) => any
  addSlide: (slide?: HTMLElement) => void
  removeSlide: (slide?: HTMLElement) => void
  onCarouselItemClick: (index: number) => void
}
export const carouselMethodsInjectionKey: InjectionKey<CarouselMethodsInjection> = Symbol(
  'carouselMethods'
)

export interface CarouselInst {
  slideTo: (index: number) => void
  slidePrev: () => void
  slideNext: () => void
  isPrev: (index: number) => boolean
  isNext: (index: number) => boolean
  isActive: (index: number) => boolean
  isPrevDisabled: () => boolean
  isNextDisabled: () => boolean
  getPrevIndex: (index?: number) => number | null
  getNextIndex: (index?: number) => number | null
}

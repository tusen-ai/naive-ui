import { InjectionKey } from 'vue'

export interface CarouselMethodsInjection {
  slideTo: (index: number) => void
  slidePrev: () => void
  slideNext: () => void
  isPrev: (slide: number | HTMLElement) => boolean
  isNext: (slide: number | HTMLElement) => boolean
  isActive: (slide: number | HTMLElement) => boolean
  isDisabledPrev: () => boolean
  isDisabledNext: () => boolean
  getSlideIndex: (slide: number | HTMLElement) => number
  getSlideStyle: (slide: HTMLElement) => any
  addSlide: (slide: HTMLElement) => void
  removeSlide: (slide: HTMLElement) => void
}
export const carouselMethodsInjectionKey: InjectionKey<CarouselMethodsInjection> = Symbol(
  'carouselMethods'
)

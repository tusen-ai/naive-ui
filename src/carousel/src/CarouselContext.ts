import { inject, provide } from 'vue'
import type { ComputedRef } from 'vue'
import { createInjectionKey, throwError } from '../../_utils'

export interface CarouselContextValue {
  currentIndexRef: ComputedRef<number>
  to: (index: number) => void
  prev: () => void
  next: () => void
  isVertical: () => boolean
  isHorizontal: () => boolean
  isPrev: (slideOrIndex: HTMLElement | number) => boolean
  isNext: (slideOrIndex: HTMLElement | number) => boolean
  isActive: (slideOrIndex: HTMLElement | number) => boolean
  isPrevDisabled: () => boolean
  isNextDisabled: () => boolean
  getSlideIndex: (slideOrIndex?: HTMLElement | number) => number
  getSlideStyle: (
    slideOrIndex: HTMLElement | number
  ) => string | Record<string, string | number> | undefined
  addSlide: (slide?: HTMLElement) => void
  removeSlide: (slide?: HTMLElement) => void
  onCarouselItemClick: (index: number, event: MouseEvent) => void
}

const carouselMethodsInjectionKey =
  createInjectionKey<CarouselContextValue>('n-carousel-methods')

export const provideCarouselContext = (
  contextValue: CarouselContextValue
): void => {
  provide(carouselMethodsInjectionKey, contextValue)
}

export const useCarouselContext = (
  location: string = 'unknown',
  component: string = 'component'
): CarouselContextValue => {
  const CarouselContext = inject(carouselMethodsInjectionKey)
  if (!CarouselContext) {
    throwError(
      location,
      `\`${component}\` must be placed inside \`n-carousel\`.`
    )
  }
  return CarouselContext
}

import { createInjectionKey } from '../../_utils'

export const tuple = <T extends string[]>(...args: T): T => args

export type ElementOf<T> = T extends Array<infer E>
  ? E
  : T extends ReadonlyArray<infer F>
    ? F
    : never

export interface CarouselMethodsInjection {
  to: (index: number) => void
  prev: () => void
  next: () => void
  isVertical: () => boolean
  isHorizontal: () => boolean
  isPrev: (slide: number | HTMLElement) => boolean
  isNext: (slide: number | HTMLElement) => boolean
  isActive: (slide: number | HTMLElement) => boolean
  isPrevDisabled: () => boolean
  isNextDisabled: () => boolean
  getCurrentIndex: () => number
  getSlideIndex: (slide: number | HTMLElement) => number
  getSlideStyle: (slide: HTMLElement) => any
  addSlide: (slide?: HTMLElement) => void
  removeSlide: (slide?: HTMLElement) => void
  onCarouselItemClick: (index: number, event: MouseEvent) => void
}
export const carouselMethodsInjectionKey =
  createInjectionKey<CarouselMethodsInjection>('n-carousel-methods')

export interface CarouselInst {
  getCurrentIndex: () => number
  to: (index: number) => void
  prev: () => void
  next: () => void
}

export const enum DragFlags {
  NORMAL = 1,
  START = 1 << 1,
  PROGRESS = 1 << 2,
  SUCCESS = 1 << 3,
  FAIL = 1 << 4,
  END = 1 << 5
}

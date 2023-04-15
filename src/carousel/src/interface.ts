import type { CarouselContextValue } from './CarouselContext'

export interface CarouselInst {
  getCurrentIndex: () => number
  to: (index: number) => void
  prev: () => void
  next: () => void
}

export interface ArrowScopedSlotProps
  extends Pick<
  CarouselContextValue,
  'to' | 'prev' | 'next' | 'isPrevDisabled' | 'isNextDisabled'
  > {
  total: number
  currentIndex: number
}

export interface DotScopedSlotProps extends Pick<CarouselContextValue, 'to'> {
  total: number
  currentIndex: number
}

export interface Size {
  width: number
  height: number
}

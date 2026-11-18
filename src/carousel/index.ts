import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NCarouselImpl from './src/Carousel'
import NCarouselItemImpl from './src/CarouselItem'

export { carouselProps } from './src/Carousel'
export type { CarouselProps, CarouselSlots } from './src/Carousel'
export type {
  CarouselArrowSlotProps,
  CarouselDotSlotProps,
  CarouselInst
} from './src/interface'

export const NCarousel: WithNativeAttrs<typeof NCarouselImpl, HTMLAttributes>
  = NCarouselImpl
export const NCarouselItem: WithNativeAttrs<
  typeof NCarouselItemImpl,
  HTMLAttributes
> = NCarouselItemImpl

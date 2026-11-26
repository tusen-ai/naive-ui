import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NSliderImpl from './src/Slider'

export { sliderProps } from './src/Slider'
export type { SliderProps, SliderSlots } from './src/Slider'

export const NSlider: WithNativeAttrs<typeof NSliderImpl, HTMLAttributes>
  = NSliderImpl

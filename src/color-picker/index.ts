import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NColorPickerImpl from './src/ColorPicker'

export { colorPickerProps } from './src/ColorPicker'
export type { ColorPickerProps, ColorPickerSlots } from './src/ColorPicker'
export type * from './src/public-types'

export const NColorPicker: WithNativeAttrs<
  typeof NColorPickerImpl,
  HTMLAttributes
> = NColorPickerImpl

import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NDynamicInputImpl from './src/DynamicInput'

export { dynamicInputProps } from './src/DynamicInput'
export type { DynamicInputProps, DynamicInputSlots } from './src/DynamicInput'
export type {
  DynamicInputActionSlotProps,
  DynamicInputDefaultSlotProps
} from './src/interface'

export const NDynamicInput: WithNativeAttrs<
  typeof NDynamicInputImpl,
  HTMLAttributes
> = NDynamicInputImpl

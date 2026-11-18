import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NFloatButtonImpl from './src/FloatButton'

export { floatButtonProps } from './src/FloatButton'
export type { FloatButtonProps, FloatButtonSlots } from './src/FloatButton'

export const NFloatButton: WithNativeAttrs<
  typeof NFloatButtonImpl,
  HTMLAttributes
> = NFloatButtonImpl

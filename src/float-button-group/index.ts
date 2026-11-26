import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NFloatButtonGroupImpl from './src/FloatButtonGroup'

export { floatButtonGroupProps } from './src/FloatButtonGroup'
export type { FloatButtonGroupProps } from './src/FloatButtonGroup'

export const NFloatButtonGroup: WithNativeAttrs<
  typeof NFloatButtonGroupImpl,
  HTMLAttributes
> = NFloatButtonGroupImpl

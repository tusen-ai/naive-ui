import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NSpinImpl from './src/Spin'

export { spinProps } from './src/Spin'
export type { SpinProps, SpinSlots } from './src/Spin'

export const NSpin: WithNativeAttrs<typeof NSpinImpl, HTMLAttributes>
  = NSpinImpl

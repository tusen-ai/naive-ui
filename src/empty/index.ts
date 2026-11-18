import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NEmptyImpl from './src/Empty'

export { emptyProps } from './src/Empty'
export type { EmptyProps, EmptySlots } from './src/Empty'

export const NEmpty: WithNativeAttrs<typeof NEmptyImpl, HTMLAttributes>
  = NEmptyImpl

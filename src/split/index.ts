import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NSplitImpl from './src/Split'

export { splitProps } from './src/Split'
export type { SplitProps, SplitSlots } from './src/Split'
export type { SplitOnUpdateSize } from './src/types'

export const NSplit: WithNativeAttrs<typeof NSplitImpl, HTMLAttributes>
  = NSplitImpl

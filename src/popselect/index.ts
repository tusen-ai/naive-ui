import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NPopselectImpl from './src/Popselect'

export type { PopselectInst } from './src/interface'
export { popselectProps } from './src/Popselect'
export type { PopselectProps, PopselectSlots } from './src/Popselect'
export type * from './src/public-types'

export const NPopselect: WithNativeAttrs<
  typeof NPopselectImpl,
  Omit<
    HTMLAttributes,
    'onBlur' | 'onFocus' | 'onKeydown' | 'onKeyup' | 'onScroll' | 'onToggle'
  >
> = NPopselectImpl

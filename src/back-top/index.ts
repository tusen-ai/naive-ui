import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NBackTopImpl from './src/BackTop'

export { backTopProps } from './src/BackTop'
export type { BackTopProps } from './src/BackTop'

export const NBackTop: WithNativeAttrs<typeof NBackTopImpl, HTMLAttributes>
  = NBackTopImpl

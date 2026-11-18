import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NElementImpl from './src/Element'

export { elementProps } from './src/Element'
export type { ElementProps } from './src/Element'

export const NElement: WithNativeAttrs<typeof NElementImpl, HTMLAttributes>
  = NElementImpl
export const NEl: typeof NElement = NElement

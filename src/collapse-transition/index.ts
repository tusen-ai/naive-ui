import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NCollapseTransitionImpl from './src/CollapseTransition'

export { collapseTransitionProps } from './src/CollapseTransition'
export type { CollapseTransitionProps } from './src/CollapseTransition'

export const NCollapseTransition: WithNativeAttrs<
  typeof NCollapseTransitionImpl,
  HTMLAttributes
> = NCollapseTransitionImpl

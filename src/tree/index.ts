import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NTreeImpl from './src/Tree'

export type {
  TreeDragInfo,
  TreeDropInfo,
  TreeInst,
  TreeOption,
  TreeOverrideNodeClickBehavior,
  TreeOverrideNodeClickBehaviorReturn
} from './src/interface'
export type * from './src/public-types'
export { treeProps } from './src/Tree'
export type { TreeProps, TreeSlots } from './src/Tree'
export { treeGetClickTarget } from './src/utils'

export const NTree: WithNativeAttrs<typeof NTreeImpl, HTMLAttributes>
  = NTreeImpl

import type { HTMLAttributes } from 'vue'
import type { WithNativeAttrs } from '../_utils'
import NTreeSelectImpl from './src/TreeSelect'

export type {
  TreeOverrideNodeClickBehavior as TreeSelectOverrideNodeClickBehavior,
  TreeOverrideNodeClickBehaviorReturn as TreeSelectOverrideNodeClickBehaviorReturn
} from '../tree'
export type {
  TreeSelectInst,
  TreeSelectNodeProps,
  TreeSelectOption,
  TreeSelectRenderLabel,
  TreeSelectRenderPrefix,
  TreeSelectRenderSuffix,
  TreeSelectRenderTag
} from './src/interface'
export type * from './src/public-types'
export { treeSelectProps } from './src/TreeSelect'
export type { TreeSelectProps, TreeSelectSlots } from './src/TreeSelect'

export const NTreeSelect: WithNativeAttrs<
  typeof NTreeSelectImpl,
  HTMLAttributes
> = NTreeSelectImpl

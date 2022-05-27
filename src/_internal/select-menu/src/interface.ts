import { VNodeChild, Ref, UnwrapRef, VNode } from 'vue'
import { TreeNode } from 'treemate'
import type {
  SelectBaseOption,
  SelectGroupOption,
  SelectIgnoredOption
} from '../../../select/src/interface'
import { createInjectionKey } from '../../../_utils/vue/create-injection-key'

export type Size = 'small' | 'medium' | 'large' | 'huge'

export type RenderLabel = (
  option: SelectBaseOption & SelectGroupOption & SelectIgnoredOption,
  selected: boolean
) => VNodeChild

export type RenderLabelImpl = (
  option: SelectBaseOption | SelectGroupOption | SelectIgnoredOption,
  selected: boolean
) => VNodeChild

export type RenderOption = (info: {
  node: VNode
  option: SelectBaseOption & SelectGroupOption & SelectIgnoredOption
  selected: boolean
}) => VNodeChild

export type RenderOptionImpl = (info: {
  node: VNode
  option: SelectBaseOption | SelectGroupOption | SelectIgnoredOption
  selected: boolean
}) => VNodeChild

export interface InternalSelectMenuInjection {
  handleOptionMouseEnter: (
    e: MouseEvent,
    tmNode: TreeNode<SelectBaseOption>
  ) => void
  handleOptionClick: (e: MouseEvent, tmNode: TreeNode<SelectBaseOption>) => void
  valueSetRef: Ref<Set<number | string>>
  pendingTmNodeRef: Ref<TreeNode<SelectBaseOption> | null>
  multipleRef: Ref<boolean>
  valueRef: Ref<string | number | Array<string | number> | null>
  renderLabelRef: Ref<RenderLabel | undefined>
  renderOptionRef: Ref<RenderOption | undefined>
  labelFieldRef: Ref<string>
  valueFieldRef: Ref<string>
}

export interface InternalExposedProps {
  selfRef: Ref<HTMLElement | null>
  getPendingTmNode: () => TreeNode<SelectBaseOption> | null
  prev: () => void
  next: () => void
}

export const internalSelectionMenuInjectionKey =
  createInjectionKey<InternalSelectMenuInjection>('n-internal-select-menu')

export const internalSelectionMenuBodyInjectionKey = createInjectionKey<
Ref<HTMLElement | null>
>('n-internal-select-menu-body')

export type InternalSelectMenuRef = UnwrapRef<InternalExposedProps>

import { VNodeChild, InjectionKey, Ref, UnwrapRef, VNode } from 'vue'
import { TreeNode } from 'treemate'
import type {
  SelectBaseOption,
  SelectGroupOption,
  SelectIgnoredOption
} from '../../../select/src/interface'

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
}

export interface InternalExposedProps {
  selfRef: Ref<HTMLElement | null>
  getPendingTmNode: () => TreeNode<SelectBaseOption> | null
  prev: () => void
  next: () => void
}

export const internalSelectionMenuInjectionKey: InjectionKey<InternalSelectMenuInjection> =
  Symbol('internal-select-menu')

export const internalSelectionMenuBodyInjectionKey: InjectionKey<
Ref<HTMLElement | null>
> = Symbol('internal-select-menu-body')

export type InternalSelectMenuRef = UnwrapRef<InternalExposedProps>

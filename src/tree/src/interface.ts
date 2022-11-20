import { CheckStrategy, TreeNode } from 'treemate'
import { HTMLAttributes, Ref, VNodeChild } from 'vue'
import type { MergedTheme } from '../../_mixins'
import { createInjectionKey } from '../../_utils'
import type { TreeTheme } from '../styles'

export type Key = string | number

export interface TreeOptionBase {
  key?: Key
  label?: string
  checkboxDisabled?: boolean
  disabled?: boolean
  isLeaf?: boolean
  children?: TreeOption[]
  prefix?: () => VNodeChild
  suffix?: () => VNodeChild
}

export type TreeOption = TreeOptionBase & { [k: string]: unknown }

export type TreeOptions = TreeOption[]

export interface TreeRenderProps {
  option: TreeOption
  checked: boolean
  selected: boolean
}

type RenderTreePart = ({
  option,
  checked,
  selected
}: TreeRenderProps) => VNodeChild

export type RenderLabel = RenderTreePart

export type RenderPrefix = RenderTreePart

export type RenderSuffix = RenderTreePart

export type TreeNodeProps = (info: {
  option: TreeOption
}) => HTMLAttributes & Record<string, unknown>

export interface TreeDragInfo {
  event: DragEvent
  node: TreeOption
}

export interface TreeDropInfo {
  event: DragEvent
  node: TreeOption
  dragNode: TreeOption
  dropPosition: 'before' | 'inside' | 'after'
}

export interface InternalDragInfo {
  event: DragEvent
  node: TmNode
}

export type DropPosition = 'before' | 'inside' | 'after'

export type AllowDrop = (info: {
  dropPosition: DropPosition
  node: TreeOption
  phase: 'drag' | 'drop'
}) => boolean

export interface InternalDropInfo {
  event: DragEvent
  node: TmNode
  dropPosition: DropPosition
}

export type RenderSwitcherIcon = (props: {
  expanded: boolean
  selected: boolean
}) => VNodeChild

export type CheckOnClick = (option: TreeOption) => boolean

export interface TreeInjection {
  loadingKeysRef: Ref<Set<Key>>
  highlightKeySetRef: Ref<Set<Key> | null>
  displayedCheckedKeysRef: Ref<Key[]>
  displayedIndeterminateKeysRef: Ref<Key[]>
  mergedSelectedKeysRef: Ref<Key[]>
  mergedExpandedKeysRef: Ref<Key[]>
  fNodesRef: Ref<Array<TreeNode<TreeOption>>>
  draggableRef: Ref<boolean>
  mergedThemeRef: Ref<MergedTheme<TreeTheme>>
  onLoadRef: Ref<((node: TreeOption) => Promise<void>) | undefined>
  blockLineRef: Ref<boolean>
  indentRef: Ref<number>
  draggingNodeRef: Ref<TmNode | null>
  droppingMouseNodeRef: Ref<TmNode | null>
  droppingNodeParentRef: Ref<TmNode | null>
  droppingPositionRef: Ref<null | DropPosition>
  droppingOffsetLevelRef: Ref<number>
  disabledRef: Ref<boolean>
  checkableRef: Ref<boolean>
  cascadeRef: Ref<boolean>
  mergedCheckStrategyRef: Ref<CheckStrategy>
  selectableRef: Ref<boolean>
  expandOnClickRef: Ref<boolean>
  pendingNodeKeyRef: Ref<null | Key>
  internalScrollableRef: Ref<boolean>
  internalCheckboxFocusableRef: Ref<boolean>
  renderLabelRef: Ref<RenderLabel | undefined>
  renderPrefixRef: Ref<RenderPrefix | undefined>
  renderSuffixRef: Ref<RenderSuffix | undefined>
  renderSwitcherIconRef: Ref<RenderSwitcherIcon | undefined>
  labelFieldRef: Ref<string>
  nodePropsRef: Ref<TreeNodeProps | undefined>
  multipleRef: Ref<boolean>
  checkboxPlacementRef: 'left' | 'right'
  internalTreeSelect: boolean
  checkOnClickRef: Ref<boolean | CheckOnClick>
  disabledFieldRef: Ref<string>
  handleSwitcherClick: (node: TreeNode<TreeOption>) => void
  handleSelect: (node: TreeNode<TreeOption>) => void
  handleCheck: (node: TreeNode<TreeOption>, checked: boolean) => void
  handleDragStart: (info: InternalDragInfo) => void
  handleDragEnter: (info: InternalDragInfo) => void
  handleDragLeave: (info: InternalDragInfo) => void
  handleDragEnd: (info: InternalDragInfo) => void
  handleDragOver: (info: InternalDragInfo) => void
  handleDrop: (info: InternalDropInfo) => void
}

export const treeInjectionKey = createInjectionKey<TreeInjection>('n-tree')

export type TmNode = TreeNode<TreeOption>

export interface MotionData {
  __motion: true
  height: number | undefined
  mode: 'expand' | 'collapse'
  nodes: TmNode[]
}

export interface InternalTreeInst {
  handleKeydown: (e: KeyboardEvent) => void
}

export interface TreeInst {
  scrollTo: (options: { key: Key }) => void
  getCheckedData: () => { keys: Key[], options: Array<TreeOption | null> }
  getIndeterminateData: () => { keys: Key[], options: Array<TreeOption | null> }
}

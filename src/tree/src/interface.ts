import { TreeNode } from 'treemate'
import { VNodeChild } from 'vue'
import type { MergedTheme } from '../../_mixins'
import type { TreeTheme } from '../styles'

export type Key = string | number

export interface BaseTreeNode {
  key: Key
  label: string
  disabled?: boolean
  children?: BaseTreeNode[]
  icon?: () => VNodeChild
}

export type TreeData = BaseTreeNode[]

export interface DragInfo {
  event: DragEvent
  node: BaseTreeNode
}

export interface DropInfo {
  event: DragEvent
  node: BaseTreeNode
  dragNode: BaseTreeNode
  dropPosition: 'top' | 'center' | 'bottom'
}

export interface InternalDragInfo {
  event: DragEvent
  node: TmNode
}

export interface InternalDropInfo {
  event: DragEvent
  node: TmNode
  dropPosition: 'top' | 'center' | 'bottom'
}

export interface TreeInjection {
  loadingKeys: Key[]
  highlightKeys: Key[]
  displayedCheckedKeys: Key[]
  displayedIndeterminateKeys: Key[]
  mergedSelectedKeys: Key[]
  mergedExpandedKeys: Key[]
  remote: boolean
  draggable: boolean
  checkable: boolean
  blockNode: boolean
  onLoad?: (node: BaseTreeNode) => Promise<void>
  handleSwitcherClick: (node: TreeNode<BaseTreeNode>) => void
  handleSelect: (node: TreeNode<BaseTreeNode>) => void
  handleCheck: (node: TreeNode<BaseTreeNode>, checked: boolean) => void
  handleDragStart: (info: InternalDragInfo) => void
  handleDragEnter: (info: InternalDragInfo) => void
  handleDragLeave: (info: InternalDragInfo) => void
  handleDragEnd: (info: InternalDragInfo) => void
  handleDrop: (info: InternalDropInfo) => void
  mergedTheme: MergedTheme<TreeTheme>
}

export type TmNode = TreeNode<BaseTreeNode>

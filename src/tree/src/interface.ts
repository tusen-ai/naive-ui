import { TreeNode } from 'treemate'
import { VNodeChild } from 'vue'
import type { MergedTheme } from '../../_mixins'
import type { TreeTheme } from '../styles'

export type Key = string | number

export interface TreeOption {
  key: Key
  label: string
  disabled?: boolean
  children?: TreeOption[]
  icon?: () => VNodeChild
}

export type TreeOptions = TreeOption[]

export interface DragInfo {
  event: DragEvent
  node: TreeOption
}

export interface DropInfo {
  event: DragEvent
  node: TreeOption
  dragNode: TreeOption
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
  onLoad?: (node: TreeOption) => Promise<void>
  handleSwitcherClick: (node: TreeNode<TreeOption>) => void
  handleSelect: (node: TreeNode<TreeOption>) => void
  handleCheck: (node: TreeNode<TreeOption>, checked: boolean) => void
  handleDragStart: (info: InternalDragInfo) => void
  handleDragEnter: (info: InternalDragInfo) => void
  handleDragLeave: (info: InternalDragInfo) => void
  handleDragEnd: (info: InternalDragInfo) => void
  handleDrop: (info: InternalDropInfo) => void
  mergedTheme: MergedTheme<TreeTheme>
}

export type TmNode = TreeNode<TreeOption>

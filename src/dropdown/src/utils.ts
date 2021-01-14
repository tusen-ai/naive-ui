import { RawNode } from 'treemate'

export function isSubmenuNode (rawNode: RawNode): boolean {
  return (
    rawNode.type === 'submenu' ||
    (rawNode.type === undefined && rawNode.children !== undefined)
  )
}

export function isGroupNode (rawNode: RawNode): boolean {
  return rawNode.type === 'group'
}

export function isDividerNode (rawNode: RawNode): boolean {
  return rawNode.type === 'divider'
}

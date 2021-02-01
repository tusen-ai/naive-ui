import type { DropdownMixedOption } from './interface'

export function isSubmenuNode (rawNode: DropdownMixedOption): boolean {
  return (
    rawNode.type === 'submenu' ||
    (rawNode.type === undefined && rawNode.children !== undefined)
  )
}

export function isGroupNode (rawNode: DropdownMixedOption): boolean {
  return rawNode.type === 'group'
}

export function isDividerNode (rawNode: DropdownMixedOption): boolean {
  return rawNode.type === 'divider'
}

import type { DropdownMixedOption, DropdownRenderOption } from './interface'

export function isSubmenuNode (
  rawNode: DropdownMixedOption,
  childrenField: string
): boolean {
  return (
    rawNode.type === 'submenu' ||
    (rawNode.type === undefined && rawNode[childrenField] !== undefined)
  )
}

export function isGroupNode (rawNode: DropdownMixedOption): boolean {
  return rawNode.type === 'group'
}

export function isDividerNode (rawNode: DropdownMixedOption): boolean {
  return rawNode.type === 'divider'
}

export function isRenderNode (
  rawNode: DropdownMixedOption
): rawNode is DropdownRenderOption {
  return rawNode.type === 'render'
}

export function isDropdownOptionRelatedTarget (element: HTMLElement): boolean {
  let currentElement: HTMLElement | null = element

  while (currentElement !== null) {
    if (currentElement.hasAttribute('__dropdown-option')) {
      return true
    }
    currentElement = currentElement.parentElement
  }

  return false
}

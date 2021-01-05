export function isSubmenuNode (rawNode) {
  return (
    rawNode.type === 'submenu' ||
    (rawNode.type === undefined && rawNode.children)
  )
}

export function isGroupNode (rawNode) {
  return rawNode.type === 'group'
}

export function isDividerNode (rawNode) {
  return rawNode.type === 'divider'
}

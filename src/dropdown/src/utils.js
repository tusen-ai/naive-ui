export function isSubmenuNode (rawNode) {
  return rawNode.type === 'submenu' || (rawNode.type === undefined && rawNode.children)
}

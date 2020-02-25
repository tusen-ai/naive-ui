export function isLeaf (node) {
  if (node.isLeaf !== undefined) return node.isLeaf
  return !node.children
}

export function isLoaded (node) {
  return !(node.isLeaf === false && !node.children)
}

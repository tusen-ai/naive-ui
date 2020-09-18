export function getVNodeChildren (vNode, slotName = 'default', fallback = []) {
  const children = vNode.children
  return (children[slotName] && children[slotName]()) || fallback
}

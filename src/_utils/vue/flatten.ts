import { Fragment, createTextVNode, VNode, VNodeChild, isVNode } from 'vue'

// o(n) flatten
export function flatten (
  vNodes: VNodeChild[],
  result: VNode[] = [],
  key?: string
): VNode[] {
  vNodes.forEach((vNode) => {
    if (vNode === null) return
    if (typeof vNode !== 'object') {
      if (typeof vNode === 'string' || typeof vNode === 'number') {
        result.push(createTextVNode(String(vNode)))
      }
      return
    }
    if (Array.isArray(vNode)) {
      flatten(vNode, result)
      return
    }
    if (vNode.type === Fragment) {
      if (vNode.children === null) return
      const currentKey = key ? `${key}_${String(vNode.key)}` : String(vNode.key)
      if (Array.isArray(vNode.children)) {
        vNode.children.forEach((node: VNodeChild, index: number) => {
          if (isVNode(node)) {
            if (node.key === undefined || node.key === null) {
              node.key = `${currentKey}_${index}`
            }
          }
        })
        flatten(vNode.children, result, currentKey)
      }
      // rawSlot
    } else if (vNode.type !== Comment) {
      result.push(vNode)
    }
  })
  return result
}

import { Fragment } from 'vue'

// o(n) flatten
export function flatten (vNodes, result = []) {
  vNodes.forEach(vNode => {
    if (vNode.type === Fragment) {
      flatten(vNode.children, result)
    } else {
      result.push(vNode)
    }
  })
  return result
}

import { Fragment } from 'vue'

export function flatten (vNodes) {
  let result = []
  vNodes.forEach(vNode => {
    if (vNode.type === Fragment) {
      result = result.concat(flatten(vNode.children))
    } else {
      result.push(vNode)
    }
  })
  return result
}

import { type VNode, vShow } from 'vue'

export function isNodeVShowFalse (vNode: VNode): boolean {
  const showDir = vNode.dirs?.find(({ dir }) => dir === vShow)
  return !!(showDir && showDir.value === false)
}

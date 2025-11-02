import type { VNode } from 'vue'
import { vShow } from 'vue'

export function isNodeVShowFalse(vNode: VNode): boolean {
  const showDir = vNode.dirs?.find(({ dir }) => dir === vShow)
  return !!(showDir && showDir.value === false)
}

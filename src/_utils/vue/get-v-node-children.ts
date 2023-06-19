import type { VNode } from 'vue'

export function getVNodeChildren (
  vNode: VNode,
  slotName = 'default',
  fallback: VNode[] = []
): VNode[] {
  const { children } = vNode
  if (
    children !== null &&
    typeof children === 'object' &&
    !Array.isArray(children)
  ) {
    const slot = children[slotName]
    if (typeof slot === 'function') {
      return slot()
    }
  }
  return fallback
}

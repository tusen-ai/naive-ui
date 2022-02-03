import { Fragment, isVNode, Slot, Comment, VNodeArrayChildren } from 'vue'

function ensureValidVNode (
  vnodes: VNodeArrayChildren
): VNodeArrayChildren | null {
  return vnodes.some((child) => {
    if (!isVNode(child)) {
      return true
    }
    if (child.type === Comment) {
      return false
    }
    if (
      child.type === Fragment &&
      !ensureValidVNode(child.children as VNodeArrayChildren)
    ) {
      return false
    }
    return true
  })
    ? vnodes
    : null
}

export function resolveSlot (
  slot: Slot | undefined,
  fallback: () => VNodeArrayChildren
): VNodeArrayChildren | null {
  return (slot && ensureValidVNode(slot())) || fallback()
}

export function resolveWrappedSlot (
  slot: Slot | undefined,
  wrapper: (children: VNodeArrayChildren) => VNodeArrayChildren
): null | VNodeArrayChildren {
  const children = slot && ensureValidVNode(slot())
  if (children) return wrapper(children)
  return null
}

import { Fragment, isVNode, Slot, VNodeChild, Comment } from 'vue'

function ensureValidVNode (vnodes): VNodeChild[] | null {
  return vnodes.some((child) => {
    if (!isVNode(child)) {
      return true
    }
    if (child.type === Comment) {
      return false
    }
    if (child.type === Fragment && !ensureValidVNode(child.children)) {
      return false
    }
    return true
  })
    ? vnodes
    : null
}

export function resolveSlot (
  slot: Slot | undefined,
  fallback: () => VNodeChild[]
): VNodeChild[] {
  return (slot && ensureValidVNode(slot())) || fallback()
}

export function resolveWrappedSlot (
  slot: Slot | undefined,
  wrapper: (children: VNodeChild[]) => VNodeChild[]
): null | VNodeChild[] {
  const children = slot && ensureValidVNode(slot())
  if (children) return wrapper(children)
  return null
}

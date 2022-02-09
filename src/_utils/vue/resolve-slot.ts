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

/**
 * We shouldn't use the following functions with slot flags `_: 1, 2, 3`
 */
export function resolveSlot (
  slot: Slot | undefined,
  fallback: () => VNodeArrayChildren
): VNodeArrayChildren {
  return (slot && ensureValidVNode(slot())) || fallback()
}

export function resolveSlotWithProps<T> (
  slot: Slot | undefined,
  props: T,
  fallback: (props: T) => VNodeArrayChildren
): VNodeArrayChildren {
  return (slot && ensureValidVNode(slot(props))) || fallback(props)
}

export function resolveWrappedSlot (
  slot: Slot | undefined,
  wrapper: (children: VNodeArrayChildren) => VNodeArrayChildren
): VNodeArrayChildren | null {
  const children = slot && ensureValidVNode(slot())
  if (children) return wrapper(children)
  return null
}

export function isSlotEmpty (slot: Slot | undefined): boolean {
  return !(slot && ensureValidVNode(slot()))
}

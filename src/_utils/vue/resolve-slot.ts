import {
  Fragment,
  isVNode,
  type Slot,
  Comment,
  type VNodeArrayChildren,
  type VNodeChild
} from 'vue'

export function ensureValidVNode (
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

/**
 * Resolve slot with wrapper if content exists, no fallback
 */
export function resolveWrappedSlot (
  slot: Slot | undefined,
  wrapper: (children: VNodeArrayChildren | null) => VNodeChild
): VNodeChild {
  const children = slot && ensureValidVNode(slot())
  return wrapper(children || null)
}

/*
 * Resolve slot with wrapper if content exists, no fallback
 */
export function resolveWrappedSlotWithProps (
  slot: Slot | undefined,
  props: any,
  wrapper: (children: VNodeArrayChildren | null) => VNodeChild
): VNodeChild {
  const children = slot && ensureValidVNode(slot(props))
  return wrapper(children || null)
}

export function isSlotEmpty (slot: Slot | undefined): boolean {
  return !(slot && ensureValidVNode(slot()))
}

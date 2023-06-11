import { type ComponentPublicInstance, type VNodeChild } from 'vue'

export function getSlot (
  instance: ComponentPublicInstance,
  slotName = 'default',
  fallback: VNodeChild[] = []
): VNodeChild[] {
  const slots = instance.$slots
  const slot = slots[slotName]
  if (slot === undefined) return fallback
  return slot()
}

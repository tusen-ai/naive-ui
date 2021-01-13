import { ComponentPublicInstance, VNode } from "vue"

export function getSlot (instance: ComponentPublicInstance, slotName = 'default', fallback: VNode[] = []) {
  const slots = instance.$slots
  const slot = slots[slotName]
  if (slot === undefined) return fallback
  return slot()
}

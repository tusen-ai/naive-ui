export function getSlot (instance, slotName = 'default', fallback = []) {
  const slots = instance.$slots
  return (slots[slotName] && slots[slotName]()) || fallback
}

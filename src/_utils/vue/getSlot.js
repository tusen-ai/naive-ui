export default function (instance, slotName = 'default', fallback = []) {
  const slots = instance.$slots
  return (slots[slotName] && slots[slotName]()) || fallback
}

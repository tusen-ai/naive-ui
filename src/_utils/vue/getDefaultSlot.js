export default function (instance, fallback) {
  fallback = fallback === undefined ? [] : fallback
  const defaultScopedSlot = instance.$scopedSlots.default
  return (defaultScopedSlot && defaultScopedSlot()) || fallback
}

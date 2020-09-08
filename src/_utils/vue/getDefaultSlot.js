export default function (instance, fallback) {
  fallback = fallback === undefined ? [] : fallback
  const defaultScopedSlot = instance.$slots.default
  return (defaultScopedSlot && defaultScopedSlot()) || fallback
}

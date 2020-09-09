export default function (instance, fallback = []) {
  const defaultSlot = instance.$slots.default
  return (defaultSlot && defaultSlot()) || fallback
}

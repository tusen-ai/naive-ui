import { onBeforeUpdate, type ComponentPublicInstance } from 'vue'

export function isTouchEvent (e: MouseEvent | TouchEvent): e is TouchEvent {
  return window.TouchEvent && e instanceof window.TouchEvent
}

type RefType = HTMLElement | ComponentPublicInstance
type RefKey = number
type RefsValue<T extends RefType> = Map<RefKey, T>
export function useRefs<T extends RefType> (): [
  RefsValue<T>,
  (key: RefKey) => (el: any) => void
] {
  const refs = new Map()
  const setRefs = (index: RefKey) => (el: any) => {
    refs.set(index, el)
  }

  onBeforeUpdate(() => {
    refs.clear()
  })

  return [refs, setRefs]
}

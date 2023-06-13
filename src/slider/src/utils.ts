import {
  ref,
  onBeforeUpdate,
  type Ref,
  type ComponentPublicInstance
} from 'vue'

export function isTouchEvent (e: MouseEvent | TouchEvent): e is TouchEvent {
  return window.TouchEvent && e instanceof window.TouchEvent
}

type RefType = HTMLElement | ComponentPublicInstance
type RefKey = number
type RefsValue<T extends RefType> = Map<RefKey, T>
export function useRefs<T extends RefType> (): [
  Ref<RefsValue<T>>,
  (key: RefKey) => (el: any) => void
] {
  const refs = ref<RefsValue<T>>(new Map())
  const setRefs = (index: RefKey) => (el: any) => {
    refs.value.set(index, el)
  }

  onBeforeUpdate(() => {
    refs.value.clear()
  })

  return [refs, setRefs]
}

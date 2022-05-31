import { ref, Ref, onBeforeMount, onBeforeUnmount } from 'vue'

const isComposingRef = ref(false)
const compositionStartHandler = (): void => {
  isComposingRef.value = true
}
const compositionEndHandler = (): void => {
  isComposingRef.value = false
}
let mountedCount = 0

export const useIsComposing = (): Ref<boolean> => {
  if (typeof window !== 'undefined') {
    onBeforeMount(() => {
      if (!mountedCount) {
        window.addEventListener('compositionstart', compositionStartHandler)
        window.addEventListener('compositionend', compositionEndHandler)
      }
      mountedCount++
    })
    onBeforeUnmount(() => {
      if (mountedCount <= 1) {
        window.removeEventListener('compositionstart', compositionStartHandler)
        window.removeEventListener('compositionend', compositionEndHandler)
        mountedCount = 0
      } else {
        mountedCount--
      }
    })
  }
  return isComposingRef
}

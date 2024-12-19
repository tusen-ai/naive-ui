import { onBeforeMount, onBeforeUnmount, type Ref, ref } from 'vue'
import { isBrowser } from '../env/is-browser'

const isComposingRef = ref(false)
function compositionStartHandler(): void {
  isComposingRef.value = true
}
function compositionEndHandler(): void {
  isComposingRef.value = false
}
let mountedCount = 0

export function useIsComposing(): Ref<boolean> {
  if (isBrowser) {
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
      }
      else {
        mountedCount--
      }
    })
  }
  return isComposingRef
}

import { ref, Ref, onMounted, onUnmounted } from 'vue'

export const useOnIsCompositing: () => {
  isComposition: Ref<boolean>
} = () => {
  const isComposition = ref(false)

  const compositionStartHandler = (): void => {
    isComposition.value = true
  }
  const compositionEndHandler = (): void => {
    isComposition.value = false
  }

  onMounted(() => {
    window.addEventListener('compositionstart', compositionStartHandler)
    window.addEventListener('compositionend', compositionEndHandler)
  })

  onUnmounted(() => {
    window.removeEventListener('compositionstart', compositionStartHandler)
    window.removeEventListener('compositionend', compositionEndHandler)
  })

  return { isComposition }
}

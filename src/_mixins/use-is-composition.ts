import { ref, Ref, onMounted, onUnmounted } from 'vue'

export const useIsComposition: () => {
  isComposition: Ref<boolean>
} = () => {
  const isComposition = ref(false)

  let previousActiveElement: null | HTMLElement = null

  const activeElementCompositionStartListener = (): void => {
    isComposition.value = true
  }

  const activeElementCompositionEndListener = (): void => {
    isComposition.value = false
  }
  const focusInListener = (): void => {
    if (!document.activeElement) {
      return
    }

    if (previousActiveElement) {
      focusOutListener()
    }

    const el = document.activeElement as HTMLElement
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      previousActiveElement = el
      el.addEventListener(
        'compositionstart',
        activeElementCompositionStartListener
      )
      el.addEventListener('compositionend', activeElementCompositionEndListener)
    }
  }
  const focusOutListener = (): void => {
    if (!previousActiveElement) {
      return
    }

    previousActiveElement.removeEventListener(
      'compositionstart',
      activeElementCompositionStartListener
    )
    previousActiveElement.removeEventListener(
      'compositionend',
      activeElementCompositionEndListener
    )
    previousActiveElement = null
  }

  onMounted(() => {
    window.addEventListener('focusin', focusInListener)
    window.addEventListener('focusout', focusOutListener)
  })

  onUnmounted(() => {
    window.removeEventListener('focusout', focusOutListener)
    window.removeEventListener('focusin', focusInListener)
  })

  return { isComposition }
}

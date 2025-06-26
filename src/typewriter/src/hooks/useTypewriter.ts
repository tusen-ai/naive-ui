import type { Ref } from 'vue'
import type { Options } from '../public-types'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function useTypewriter(content: Ref<string>, options: Options = {}) {
  const { interval = 80, step = 1, initialIndex = 5 } = options
  const length = computed(() => content.value.length)

  const index = ref(initialIndex)
  const typedContent = ref(content.value.slice(0, initialIndex))
  const isTyping = ref(index.value < length.value)

  let timer: ReturnType<typeof setTimeout> | null = null

  const startTyping = () => {
    if (index.value >= length.value) {
      isTyping.value = false
      return
    }

    isTyping.value = true
    const currentStep = Array.isArray(step)
      ? getRandomInt(step[0], step[1])
      : step

    timer = setTimeout(() => {
      index.value += currentStep
      typedContent.value = content.value.slice(
        0,
        Math.min(index.value, length.value)
      )
      startTyping()
    }, interval)
  }

  onMounted(() => {
    startTyping()
  })

  onUnmounted(() => {
    if (timer)
      clearTimeout(timer)
  })

  watch(
    () => content.value,
    (newContent, oldContent) => {
      if (timer)
        clearTimeout(timer)

      const shouldReset = !oldContent || !newContent?.startsWith(oldContent)

      if (shouldReset) {
        index.value = initialIndex
        typedContent.value = newContent.slice(0, initialIndex)
        startTyping()
      }
      else {
        startTyping()
      }
    },
    { immediate: true }
  )

  return {
    typedContent,
    isTyping
  }
}

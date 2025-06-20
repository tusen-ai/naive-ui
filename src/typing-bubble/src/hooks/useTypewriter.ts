import type { Options } from '../public-types'
import { onMounted, onUnmounted, ref, watch } from 'vue'

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function useTypewriter(content: string, options: Options = {}) {
  const { interval = 80, step = 1, initialIndex = 5 } = options
  const length = content.length

  const index = ref(initialIndex)
  const typedContent = ref(content.slice(0, initialIndex))
  const isTyping = ref(index.value < length)

  let timer: ReturnType<typeof setTimeout> | null = null

  const startTyping = () => {
    if (index.value >= length) {
      isTyping.value = false
      return
    }

    isTyping.value = true
    const currentStep = Array.isArray(step)
      ? getRandomInt(step[0], step[1])
      : step

    timer = setTimeout(() => {
      index.value += currentStep
      typedContent.value = content.slice(0, index.value)
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

  // 监听内容变化，重置打字机
  watch(() => content, (newContent) => {
    if (timer)
      clearTimeout(timer)
    index.value = initialIndex
    typedContent.value = newContent.slice(0, initialIndex)
    startTyping()
  })

  return {
    typedContent,
    isTyping
  }
}

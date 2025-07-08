import type { MermaidConfig } from 'mermaid/dist/config.type'
import type { Ref } from 'vue'
import type { Mermaid } from '../../../_mixins'
import { Md5 } from 'ts-md5'
import { computed, onMounted, ref, watchEffect } from 'vue'

const MD5_LENGTH_THRESHOLD = 10_000
const MAX_RETRY_COUNT = 2

const mermaidCache = new Map<string, string>()

export function useMermaidContent(
  mermaid: Ref<Mermaid>,
  content: string,
  options: {
    id: string
    theme: MermaidConfig['theme']
    themeVariables: any
  }
) {
  const svg = ref<string>('')
  const isLoading = ref(true)
  const error = ref<Error | null>(null)
  const retryCount = ref(0)
  const validContent = ref<string>('')

  const mermaidConfig = computed<MermaidConfig>(() => ({
    gantt: { useWidth: 1920 },
    securityLevel: 'loose',
    startOnLoad: false,
    theme: options.theme,
    themeVariables: options.themeVariables || undefined
  }))

  const cacheKey = computed(() => {
    const contentHash
      = content.length < MD5_LENGTH_THRESHOLD ? content : Md5.hashStr(content)
    return [options.id, options.theme, contentHash].filter(Boolean).join('-')
  })

  const renderMermaid = async () => {
    isLoading.value = true
    error.value = null

    try {
      if (mermaidCache.has(cacheKey.value)) {
        svg.value = mermaidCache.get(cacheKey.value)!
        validContent.value = svg.value
        return
      }

      if (!mermaid.value)
        return

      const isValid = await mermaid.value.parse(content)
      if (!isValid) {
        throw new Error('Mermaid isValid')
      }

      mermaid.value.initialize(mermaidConfig.value)
      const { svg: renderedSvg } = await mermaid.value.render(
        options.id,
        content
      )

      svg.value = renderedSvg
      validContent.value = renderedSvg
      mermaidCache.set(cacheKey.value, renderedSvg)
      retryCount.value = 0
    }
    catch (err) {
      error.value = err as Error

      if (validContent.value) {
        svg.value = validContent.value
      }

      if (retryCount.value < MAX_RETRY_COUNT) {
        retryCount.value += 1
        setTimeout(renderMermaid, 1000 * retryCount.value)
      }
      else {
        console.error('Mermaid error:', err)
      }
    }
    finally {
      isLoading.value = false
    }
  }

  watchEffect(() => {
    if (content && options.id) {
      renderMermaid()
    }
  })

  onMounted(renderMermaid)

  return {
    svg,
    isLoading,
    error,
    retryCount
  }
}

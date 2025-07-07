import type { MermaidConfig } from 'mermaid/dist/config.type'
import { Md5 } from 'ts-md5'
import { computed, onMounted, ref, watchEffect } from 'vue'

const MD5_LENGTH_THRESHOLD = 10_000
const MAX_RETRY_COUNT = 2

const mermaidCache = new Map<string, string>()

let mermaidInstance: any = null
async function loadMermaid() {
  if (typeof window === 'undefined') {
    if (typeof window === 'undefined') {
      return null
    }
  }
  if (!mermaidInstance) {
    const mermaid = await import('mermaid')
    mermaidInstance = mermaid.default
  }
  return mermaidInstance
}

export function useMermaid(
  content: string,
  options: {
    id: string
    theme?: MermaidConfig['theme']
  }
) {
  const svg = ref<string>('')
  const isLoading = ref(true)
  const error = ref<Error | null>(null)
  const retryCount = ref(0)
  const validContent = ref<string>('') // 存储最近一次有效内容

  const mermaidConfig = computed<MermaidConfig>(() => ({
    // fontFamily: theme.value.fontFamilyCode,
    gantt: { useWidth: 1920 },
    securityLevel: 'loose',
    startOnLoad: false
    // theme: options.theme || (theme.value.isDarkMode ? 'dark' : 'neutral'),
    // themeVariables: options.theme
    //   ? undefined
    //   : {
    //       errorBkgColor: theme.value.colorTextDescription,
    //       errorTextColor: theme.value.colorTextDescription,
    //       fontFamily: theme.value.fontFamily,
    //       lineColor: theme.value.colorTextSecondary,
    //       mainBkg: theme.value.colorBgContainer,
    //       noteBkgColor: theme.value.colorInfoBg,
    //       noteTextColor: theme.value.colorInfoText,
    //       pie1: theme.value.geekblue,
    //       pie2: theme.value.colorWarning,
    //       pie3: theme.value.colorSuccess,
    //       pie4: theme.value.colorError,
    //       primaryBorderColor: theme.value.colorBorder,
    //       primaryColor: theme.value.colorBgContainer,
    //       primaryTextColor: theme.value.colorText,
    //       secondaryBorderColor: theme.value.colorInfoBorder,
    //       secondaryColor: theme.value.colorInfoBg,
    //       secondaryTextColor: theme.value.colorInfoText,
    //       tertiaryBorderColor: theme.value.colorSuccessBorder,
    //       tertiaryColor: theme.value.colorSuccessBg,
    //       tertiaryTextColor: theme.value.colorSuccessText,
    //       textColor: theme.value.colorText,
    //     },
  }))

  const cacheKey = computed(() => {
    const contentHash
      = content.length < MD5_LENGTH_THRESHOLD ? content : Md5.hashStr(content)
    return [
      options.id,
      //   options.theme || (theme.value.isDarkMode ? 'd' : 'l'),
      contentHash
    ]
      .filter(Boolean)
      .join('-')
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

      const mermaid = await loadMermaid()
      if (!mermaid)
        return

      const isValid = await mermaid.parse(content)
      if (!isValid) {
        throw new Error('Mermaid isValid')
      }

      mermaid.initialize(mermaidConfig.value)
      const { svg: renderedSvg } = await mermaid.render(options.id, content)

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

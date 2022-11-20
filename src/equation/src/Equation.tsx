import { h, defineComponent, computed, PropType, inject } from 'vue'
import { KatexOptions } from 'katex'
import { Katex } from '../../config-provider/src/katex'
import { configProviderInjectionKey } from '../../config-provider/src/context'

export const equationProps = {
  value: String,
  katex: Object as PropType<Katex>,
  katexOptions: Object as PropType<KatexOptions>
} as const

export const Equation = defineComponent({
  name: 'Equation',
  props: equationProps,
  setup (props) {
    const configProviderContext = inject(configProviderInjectionKey)
    const extractedHtmlInfo = computed(() => {
      const outerHtml =
        (
          props.katex || configProviderContext?.mergedKatexRef.value
        )?.renderToString(props.value || '', {
          throwOnError: false,
          ...props.katexOptions
        }) || 'no katex provided'
      const matchResult = outerHtml.match(
        /^<([a-z]+)[^>]+class="([^"]+)"[^>]*>/
      )
      const wrapperTag = matchResult?.[1] || 'span'
      const wrapperClass = matchResult?.[2]
      const innerHtml = outerHtml
        .replace(/^<[a-z]+[^>]*>/, '')
        .replace(/<\/[a-z]+>$/, '')
      return { wrapperTag, innerHtml, wrapperClass }
    })
    return () => {
      const { innerHtml, wrapperClass, wrapperTag } = extractedHtmlInfo.value
      return h(wrapperTag, { class: wrapperClass, innerHTML: innerHtml })
    }
  }
})

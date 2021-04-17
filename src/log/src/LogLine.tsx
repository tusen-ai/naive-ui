import { h, defineComponent, inject, ref, onMounted, watch, toRef } from 'vue'
import { logInjectionKey } from './Log'

export default defineComponent({
  props: {
    line: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NLog = inject(logInjectionKey)!
    const selfRef = ref<HTMLElement | null>(null)
    function setInnerHTML (): void {
      const trimmedLine = NLog.trim ? (props.line || '').trim() : props.line
      if (selfRef.value) {
        selfRef.value.innerHTML = generateCodeHTML(
          NLog.language,
          trimmedLine,
          false
        )
      }
    }
    function generateCodeHTML (
      language: string | undefined,
      code: string,
      trim: boolean
    ): string {
      if (trim) code = code.trim()
      const { mergedHljs: hljs } = NLog
      if (hljs) {
        if (language && hljs.getLanguage(language)) {
          return hljs.highlight(code, { language }).value
        }
      }
      return code
    }
    onMounted(() => {
      if (NLog.highlight) {
        setInnerHTML()
      }
    })
    watch(toRef(props, 'line'), () => {
      if (NLog.highlight) {
        setInnerHTML()
      }
    })
    return {
      NLog,
      selfRef
    }
  },
  render () {
    const { NLog } = this
    return <pre ref="selfRef">{NLog.highlight ? null : this.line}</pre>
  }
})

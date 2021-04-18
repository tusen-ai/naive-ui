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
    const { trimRef, highlightRef, languageRef, mergedHljsRef } = inject(
      logInjectionKey
    )!
    const selfRef = ref<HTMLElement | null>(null)
    function setInnerHTML (): void {
      const trimmedLine = trimRef.value ? (props.line || '').trim() : props.line
      if (selfRef.value) {
        selfRef.value.innerHTML = generateCodeHTML(
          languageRef.value,
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
      const { value: hljs } = mergedHljsRef
      if (hljs) {
        if (language && hljs.getLanguage(language)) {
          return hljs.highlight(code, { language }).value
        }
      }
      return code
    }
    onMounted(() => {
      if (highlightRef.value) {
        setInnerHTML()
      }
    })
    watch(toRef(props, 'line'), () => {
      if (highlightRef.value) {
        setInnerHTML()
      }
    })
    return {
      highlight: highlightRef,
      selfRef
    }
  },
  render () {
    const { highlight } = this
    return <pre ref="selfRef">{highlight ? null : this.line}</pre>
  }
})

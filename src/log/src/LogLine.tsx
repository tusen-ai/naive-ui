import {
  h,
  defineComponent,
  inject,
  ref,
  onMounted,
  watch,
  toRef,
  computed
} from 'vue'
import { logInjectionKey } from './Log'

export default defineComponent({
  props: {
    line: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const { trimRef, highlightRef, languageRef, mergedHljsRef } =
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      inject(logInjectionKey)!
    const selfRef = ref<HTMLElement | null>(null)
    const mergedLineTrimRef = computed(() => {
      return trimRef.value ? (props.line || '').trim() : props.line
    })
    function setInnerHTML (): void {
      if (selfRef.value) {
        selfRef.value.innerHTML = generateCodeHTML(
          languageRef.value,
          mergedLineTrimRef.value
        )
      }
    }
    function generateCodeHTML (
      language: string | undefined,
      code: string
    ): string {
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
      selfRef,
      mergedLineTrim: mergedLineTrimRef
    }
  },
  render () {
    const { highlight, mergedLineTrim } = this
    return <pre ref="selfRef">{highlight ? null : mergedLineTrim}</pre>
  }
})

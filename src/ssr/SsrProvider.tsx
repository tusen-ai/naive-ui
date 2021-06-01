import { defineComponent, provide } from 'vue'
import { ssrAdapter } from '@css-render/vue3-ssr'
import { ssrInjectionKey } from './context'

export default defineComponent({
  name: 'SsrProvider',
  props: {
    ssr: {
      type: Boolean,
      default: true
    }
  },
  setup ({ ssr }, { slots }) {
    ssr && provide(ssrInjectionKey, ssrAdapter)
    return () => slots.default?.()
  }
})

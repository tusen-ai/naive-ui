import type { PropType } from 'vue'
import { defineComponent } from 'vue'

export const NInjectionExtractor = defineComponent({
  name: 'InjectionExtractor',
  props: {
    onSetup: Function as PropType<() => void>
  },
  setup(props, { slots }) {
    props.onSetup?.()
    return () => slots.default?.()
  }
})

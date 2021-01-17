import { h, defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    onFocus: {
      type: Function as PropType<((e: FocusEvent) => void) | undefined>,
      default: undefined
    },
    onBlur: {
      type: Function as PropType<((e: FocusEvent) => void) | undefined>,
      default: undefined
    }
  },
  setup (props) {
    return () => (
      <div
        style="width: 0; height: 0"
        tabindex={0}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      />
    )
  }
})

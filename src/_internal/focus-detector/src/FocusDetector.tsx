import { h, defineComponent, type PropType } from 'vue'

export default defineComponent({
  props: {
    onFocus: Function as PropType<(e: FocusEvent) => void>,
    onBlur: Function as PropType<(e: FocusEvent) => void>
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

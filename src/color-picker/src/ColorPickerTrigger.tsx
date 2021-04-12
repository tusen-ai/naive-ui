import { RGBA, toRgbaString } from 'seemly'
import { defineComponent, PropType, h } from 'vue'

export default defineComponent({
  name: 'ColorPickerTrigger',
  props: {
    rgba: {
      type: (Array as unknown) as PropType<RGBA | null>,
      default: null
    },
    onClick: Function as PropType<() => void>
  },
  render () {
    const { rgba } = this
    return (
      <div
        class="n-color-picker-trigger"
        style={{
          color: rgba ? toRgbaString(rgba) : ''
        }}
      />
    )
  }
})

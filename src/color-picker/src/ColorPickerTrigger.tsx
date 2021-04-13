import { HSLA, toHslaString } from 'seemly'
import { defineComponent, PropType, h } from 'vue'

export default defineComponent({
  name: 'ColorPickerTrigger',
  props: {
    value: {
      type: String as PropType<string | null>,
      default: null
    },
    hsla: {
      type: (Array as unknown) as PropType<HSLA | null>,
      default: null
    },
    onClick: Function as PropType<() => void>
  },
  render () {
    const { hsla, value } = this
    return (
      <div class="n-color-picker-trigger" onClick={this.onClick}>
        <div
          class="n-color-picker-trigger__fill"
          style={{
            backgroundColor: hsla ? toHslaString(hsla) : ''
          }}
        >
          {value && hsla ? (
            <div
              class="n-color-picker-trigger__value"
              style={{
                color: hsla[2] > 50 ? 'black' : 'white'
              }}
            >
              {value}
            </div>
          ) : null}
        </div>
      </div>
    )
  }
})

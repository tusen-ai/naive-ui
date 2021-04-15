import { HSLA, toHslaString } from 'seemly'
import { defineComponent, PropType, h } from 'vue'

export default defineComponent({
  name: 'ColorPickerTrigger',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
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
    const { hsla, value, clsPrefix } = this
    return (
      <div class={`${clsPrefix}-color-picker-trigger`} onClick={this.onClick}>
        <div class={`${clsPrefix}-color-picker-trigger__fill`}>
          <div class={`${clsPrefix}-color-picker-checkboard`} />
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              backgroundColor: hsla ? toHslaString(hsla) : ''
            }}
          />
          {value && hsla ? (
            <div
              class={`${clsPrefix}-color-picker-trigger__value`}
              style={{
                color: hsla[2] > 50 || hsla[3] < 0.5 ? 'black' : 'white'
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

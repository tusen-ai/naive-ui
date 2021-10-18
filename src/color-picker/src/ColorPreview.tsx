import { defineComponent, h, PropType } from 'vue'
import { getModeFromValue } from './utils'

export default defineComponent({
  name: 'InputColorTrigger',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    color: {
      type: String as PropType<string | null>,
      default: null,
      validator: (value: string) => {
        const mode = getModeFromValue(value)
        return Boolean(!value || (mode && mode !== 'hsv'))
      }
    },
    onUpdateColor: {
      type: Function as PropType<(value: string) => void>,
      required: true
    }
  },
  setup (props) {
    function handleChange (e: Event): void {
      // hex
      const value = (e.target as HTMLInputElement).value
      props.onUpdateColor?.(value.toLocaleUpperCase())
      e.stopPropagation()
    }

    return {
      handleChange
    }
  },
  render () {
    const { clsPrefix } = this
    return (
      <div class={`${clsPrefix}-color-picker-preview__preview`}>
        <span
          class={`${clsPrefix}-color-picker-preview__fill`}
          style={{
            background: this.color || '#000000'
          }}
        />
        <input
          class={`${clsPrefix}-color-picker-preview__input`}
          type="color"
          value={this.color}
          onChange={this.handleChange}
        />
      </div>
    )
  }
})

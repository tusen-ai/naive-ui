import { HSLA } from 'seemly'
import { defineComponent, PropType, h, inject } from 'vue'
import { gradientPickerInjectionKey } from './context'

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
    flat: Boolean,
    hsla: {
      type: Array as unknown as PropType<HSLA | null>,
      default: null
    },
    disabled: Boolean,
    onClick: Function as PropType<() => void>
  },
  setup (props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { gradientPickerSlots, renderLabelRef } = inject(
      gradientPickerInjectionKey,
      null
    )!
    return () => {
      const { hsla, value, flat, clsPrefix, onClick, disabled } = props
      const renderLabel = gradientPickerSlots.label || renderLabelRef.value
      return (
        <div
          class={[
            `${clsPrefix}-gradient-picker-trigger`,
            disabled && `${clsPrefix}-gradient-picker-trigger--disabled`
          ]}
          onClick={disabled ? undefined : onClick}
        >
          <div class={`${clsPrefix}-gradient-picker-trigger__fill`}>
            <div class={`${clsPrefix}-gradient-picker-checkboard`} />
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                [flat ? 'background-color' : 'background-image']: value
              }}
            />
            {value && hsla ? (
              <div
                class={`${clsPrefix}-gradient-picker-trigger__value`}
                style={{
                  color: hsla[2] > 50 || hsla[3] < 0.5 ? 'black' : 'white'
                }}
              >
                {renderLabel ? renderLabel(value) : value}
              </div>
            ) : null}
          </div>
        </div>
      )
    }
  }
})

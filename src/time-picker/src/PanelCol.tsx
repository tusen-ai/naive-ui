import { h, defineComponent, type PropType } from 'vue'
import { type Item } from './interface'

export default defineComponent({
  name: 'TimePickerPanelCol',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    data: {
      type: Array as PropType<Item[]>,
      required: true
    },
    activeValue: {
      type: Number as PropType<number | null | 'am' | 'pm'>,
      default: null
    },
    // It should be required but vue's type seems to have bugs
    onItemClick: Function as PropType<(value: number | 'am' | 'pm') => void>
  },
  render () {
    const { activeValue, onItemClick, clsPrefix } = this
    return this.data.map((item) => {
      const { label, disabled, value } = item
      const active = activeValue === value
      return (
        <div
          key={label}
          data-active={active ? '' : null}
          class={[
            `${clsPrefix}-time-picker-col__item`,
            active && `${clsPrefix}-time-picker-col__item--active`,
            disabled && `${clsPrefix}-time-picker-col__item--disabled`
          ]}
          onClick={
            onItemClick && !disabled
              ? () => {
                  onItemClick(value)
                }
              : undefined
          }
        >
          {label}
        </div>
      )
    })
  }
})

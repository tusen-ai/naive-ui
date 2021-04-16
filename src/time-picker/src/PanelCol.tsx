import { h, defineComponent, PropType } from 'vue'

export interface Item {
  value: string
  disabled: boolean
}

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
      type: Number as PropType<number | null>,
      default: null
    },
    onItemClick: Function as PropType<(value: number) => void>
  },
  render () {
    const { activeValue, onItemClick, clsPrefix } = this
    return this.data.map((item) => {
      const { value, disabled } = item
      const numValue = Number(value)
      const active = activeValue === numValue
      return (
        <div
          key={value}
          data-active={active ? '' : null}
          class={[
            `${clsPrefix}-time-picker-col__item`,
            {
              [`${clsPrefix}-time-picker-col__item--active`]: active,
              [`${clsPrefix}-time-picker-col__item--disabled`]: disabled
            }
          ]}
          onClick={
            onItemClick && !disabled ? () => onItemClick(numValue) : undefined
          }
        >
          {value}
        </div>
      )
    })
  }
})

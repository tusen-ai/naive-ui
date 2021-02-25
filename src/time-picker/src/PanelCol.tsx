import { h, defineComponent, PropType } from 'vue'

export interface Item {
  value: string
  disabled: boolean
}

export default defineComponent({
  name: 'TimePickerPanelCol',
  props: {
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
    const { activeValue, onItemClick } = this
    return this.data.map((item) => {
      const { value, disabled } = item
      const numValue = Number(value)
      const active = activeValue === numValue
      return (
        <div
          key={value}
          data-active={active ? '' : null}
          class={[
            'n-time-picker-col__item',
            {
              'n-time-picker-col__item--active': active,
              'n-time-picker-col__item--disabled': disabled
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

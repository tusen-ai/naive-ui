import { type PropType, defineComponent, h, inject } from 'vue'
import { NRadio } from '../../../radio'
import { type RowKey, dataTableInjectionKey } from '../interface'

// Extract the radio to avoid useless rendering in table body
export default defineComponent({
  name: 'DataTableBodyRadio',
  props: {
    rowKey: {
      type: [String, Number] as PropType<RowKey>,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    },
    onUpdateChecked: {
      type: Function as PropType<(checked: boolean) => void>,
      required: true
    }
  },
  setup(props) {
    const { mergedCheckedRowKeySetRef, componentId } = inject(
      dataTableInjectionKey
    )!
    return () => {
      const { rowKey } = props
      return (
        <NRadio
          name={componentId}
          disabled={props.disabled}
          checked={mergedCheckedRowKeySetRef.value.has(rowKey)}
          onUpdateChecked={props.onUpdateChecked}
        />
      )
    }
  }
})

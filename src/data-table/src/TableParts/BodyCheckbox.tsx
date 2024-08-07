import { type PropType, defineComponent, h, inject } from 'vue'
import { NCheckbox } from '../../../checkbox'
import { type RowKey, dataTableInjectionKey } from '../interface'

// Extract the checkbox to avoid useless rendering in table body
export default defineComponent({
  name: 'DataTableBodyCheckbox',
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
      type: Function as PropType<
        (checked: boolean, e: MouseEvent | KeyboardEvent) => void
      >,
      required: true
    }
  },
  setup(props) {
    const { mergedCheckedRowKeySetRef, mergedInderminateRowKeySetRef } = inject(
      dataTableInjectionKey
    )!
    return () => {
      const { rowKey } = props
      return (
        <NCheckbox
          privateInsideTable
          disabled={props.disabled}
          indeterminate={mergedInderminateRowKeySetRef.value.has(rowKey)}
          checked={mergedCheckedRowKeySetRef.value.has(rowKey)}
          onUpdateChecked={props.onUpdateChecked}
        />
      )
    }
  }
})

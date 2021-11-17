import { defineComponent, h, PropType, inject } from 'vue'
import { NCheckbox } from '../../../checkbox'
import { dataTableInjectionKey, RowKey } from '../interface'

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
  setup (props) {
    const {
      mergedCheckedRowKeySetRef,
      mergedInderminateRowKeySetRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(dataTableInjectionKey)!
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

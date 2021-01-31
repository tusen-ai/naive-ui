import { computed, ComputedRef, ref, toRef } from 'vue'
import { useMergedState } from 'vooks'
import { DataTableProps } from './DataTable'
import { RowKey, TableColumnInfo, TableNode } from './interface'
import { call } from '../../_utils'
import { createRowKey, setCheckStatusOfRow } from './utils'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useCheck (
  props: DataTableProps,
  data: {
    paginatedDataRef: ComputedRef<TableNode[]>
  }
) {
  const { paginatedDataRef } = data
  const uncontrolledCheckedRowKeysRef = ref(props.defaultCheckedRowKeys)
  const controlledCheckedRowKeysRef = toRef(props, 'checkedRowKeys')
  const mergedCheckedRowKeysRef = useMergedState(
    controlledCheckedRowKeysRef,
    uncontrolledCheckedRowKeysRef
  )
  const countOfCurrentPageCheckedRowsRef = computed(() => {
    const { value: checkedRowKeys } = mergedCheckedRowKeysRef
    const { rowKey } = props
    return paginatedDataRef.value.reduce((total, row) => {
      const key = createRowKey(row, rowKey)
      return total + (checkedRowKeys.includes(key) ? 1 : 0)
    }, 0)
  })
  const someRowsCheckedRef = computed(() => {
    return (
      countOfCurrentPageCheckedRowsRef.value > 0 &&
      countOfCurrentPageCheckedRowsRef.value < paginatedDataRef.value.length
    )
  })
  const allRowsCheckedRef = computed(() => {
    return (
      countOfCurrentPageCheckedRowsRef.value === paginatedDataRef.value.length
    )
  })
  function doUpdateCheckedRowKeys (keys: RowKey[]): void {
    const {
      'onUpdate:checkedRowKeys': onUpdateCheckedRowKeys,
      onCheckedRowKeysChange
    } = props
    if (onUpdateCheckedRowKeys) call(onUpdateCheckedRowKeys, keys)
    if (onCheckedRowKeysChange) call(onCheckedRowKeysChange, keys)
    uncontrolledCheckedRowKeysRef.value = keys
  }
  function doCheckAll (column: TableColumnInfo): void {
    const checkedRowKeys = Array.from(mergedCheckedRowKeysRef.value)
    const { rowKey } = props
    paginatedDataRef.value.forEach((row) => {
      if (column.disabled?.(row)) {
        return
      }
      setCheckStatusOfRow(checkedRowKeys, row, true, rowKey)
    })
    doUpdateCheckedRowKeys(checkedRowKeys)
  }
  function doUncheckAll (column: TableColumnInfo): void {
    const checkedRowKeys = Array.from(mergedCheckedRowKeysRef.value)
    const { rowKey } = props
    paginatedDataRef.value.forEach((row) => {
      if (column.disabled?.(row)) {
        return
      }
      setCheckStatusOfRow(checkedRowKeys, row, false, rowKey)
    })
    doUpdateCheckedRowKeys(checkedRowKeys)
  }
  return {
    mergedCheckedRowKeys: mergedCheckedRowKeysRef,
    someRowsChecked: someRowsCheckedRef,
    allRowsChecked: allRowsCheckedRef,
    doUpdateCheckedRowKeys,
    doCheckAll,
    doUncheckAll
  }
}

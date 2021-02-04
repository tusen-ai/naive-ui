import { computed, ComputedRef, ref, toRef } from 'vue'
import { useMergedState } from 'vooks'
import { DataTableProps } from './DataTable'
import { RowKey, SelectionColInfo, TableNode, TmNode } from './interface'
import { call } from '../../_utils'
import { TreeMate } from 'treemate'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useCheck (
  props: DataTableProps,
  data: {
    paginatedDataRef: ComputedRef<TmNode[]>
    treeMateRef: ComputedRef<TreeMate<TableNode>>
  }
) {
  const { paginatedDataRef, treeMateRef } = data
  const uncontrolledCheckedRowKeysRef = ref(props.defaultCheckedRowKeys)
  const controlledCheckedRowKeysRef = toRef(props, 'checkedRowKeys')
  const mergedCheckedRowKeysRef = useMergedState(
    controlledCheckedRowKeysRef,
    uncontrolledCheckedRowKeysRef
  )
  const countOfCurrentPageCheckedRowsRef = computed(() => {
    const { value: checkedRowKeys } = mergedCheckedRowKeysRef
    return paginatedDataRef.value.reduce((total, tmNode) => {
      const { key } = tmNode
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
  function doCheckAll (column: SelectionColInfo): void {
    const rowKeysToCheck: RowKey[] = []
    paginatedDataRef.value.forEach((tmNode) => {
      if (column.disabled?.(tmNode.rawNode)) {
        return
      }
      if (!tmNode.disabled) {
        rowKeysToCheck.push(tmNode.key)
      }
    })
    doUpdateCheckedRowKeys(
      treeMateRef.value.check(rowKeysToCheck, mergedCheckedRowKeysRef.value)
        .checkedKeys
    )
  }
  function doUncheckAll (column: SelectionColInfo): void {
    const rowKeysToUncheck: RowKey[] = []
    paginatedDataRef.value.forEach((tmNode) => {
      const { rawNode: row } = tmNode
      if (column.disabled?.(row)) {
        return
      }
      if (!tmNode.disabled) {
        rowKeysToUncheck.push(tmNode.key)
      }
    })
    doUpdateCheckedRowKeys(
      treeMateRef.value.uncheck(rowKeysToUncheck, mergedCheckedRowKeysRef.value)
        .checkedKeys
    )
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

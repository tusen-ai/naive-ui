import { computed, ComputedRef, ref, toRef } from 'vue'
import { useMergedState } from 'vooks'
import { DataTableSetupProps } from './DataTable'
import { RowKey, TableSelectionColumn, RowData, TmNode } from './interface'
import { call } from '../../_utils'
import { TreeMate } from 'treemate'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useCheck (
  props: DataTableSetupProps,
  data: {
    selectionColumnRef: ComputedRef<TableSelectionColumn | null>
    paginatedDataRef: ComputedRef<TmNode[]>
    treeMateRef: ComputedRef<TreeMate<RowData>>
  }
) {
  const { paginatedDataRef, treeMateRef, selectionColumnRef } = data
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
  function doCheckAll (checkWholeTable: boolean = false): void {
    const { value: column } = selectionColumnRef
    if (!column) return
    const rowKeysToCheck: RowKey[] = []
    ;(checkWholeTable
      ? treeMateRef.value.treeNodes
      : paginatedDataRef.value
    ).forEach((tmNode) => {
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
  function doUncheckAll (checkWholeTable: boolean = false): void {
    const { value: column } = selectionColumnRef
    if (!column) return
    const rowKeysToUncheck: RowKey[] = []
    ;(checkWholeTable
      ? treeMateRef.value.treeNodes
      : paginatedDataRef.value
    ).forEach((tmNode) => {
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
    mergedCheckedRowKeysRef,
    someRowsCheckedRef,
    allRowsCheckedRef,
    doUpdateCheckedRowKeys,
    doCheckAll,
    doUncheckAll
  }
}

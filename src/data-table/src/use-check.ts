import { computed, ComputedRef, ref } from 'vue'
import { DataTableSetupProps } from './DataTable'
import {
  RowKey,
  TableSelectionColumn,
  InternalRowData,
  TmNode
} from './interface'
import { call } from '../../_utils'
import { TreeMate } from 'treemate'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useCheck (
  props: DataTableSetupProps,
  data: {
    selectionColumnRef: ComputedRef<TableSelectionColumn | null>
    paginatedDataRef: ComputedRef<TmNode[]>
    treeMateRef: ComputedRef<TreeMate<InternalRowData>>
  }
) {
  const { paginatedDataRef, treeMateRef, selectionColumnRef } = data
  const uncontrolledCheckedRowKeysRef = ref(props.defaultCheckedRowKeys)
  const mergedCheckState = computed(() => {
    const { checkedRowKeys } = props
    return treeMateRef.value.getCheckedKeys(
      checkedRowKeys === undefined
        ? uncontrolledCheckedRowKeysRef.value
        : checkedRowKeys,
      {
        cascade: props.cascade
      }
    )
  })

  const mergedCheckedRowKeysRef = computed(
    () => mergedCheckState.value.checkedKeys
  )
  const mergedInderminateRowKeysRef = computed(
    () => mergedCheckState.value.indeterminateKeys
  )
  const mergedCheckedRowKeySetRef = computed(() => {
    return new Set(mergedCheckedRowKeysRef.value)
  })
  const mergedInderminateRowKeySetRef = computed(() => {
    return new Set(mergedInderminateRowKeysRef.value)
  })
  const countOfCurrentPageCheckedRowsRef = computed(() => {
    const { value: mergedCheckedRowKeySet } = mergedCheckedRowKeySetRef
    return paginatedDataRef.value.reduce((total, tmNode) => {
      const { key } = tmNode
      return total + (mergedCheckedRowKeySet.has(key) ? 1 : 0)
    }, 0)
  })
  const someRowsCheckedRef = computed(() => {
    const { value: mergedInderminateRowKeySet } = mergedInderminateRowKeySetRef
    return (
      (countOfCurrentPageCheckedRowsRef.value > 0 &&
        countOfCurrentPageCheckedRowsRef.value <
          paginatedDataRef.value.length) ||
      paginatedDataRef.value.some((rowData) =>
        mergedInderminateRowKeySet.has(rowData.key)
      )
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
  function doCheck (rowKey: RowKey): void {
    doUpdateCheckedRowKeys(
      treeMateRef.value.check(rowKey, mergedCheckedRowKeysRef.value, {
        cascade: props.cascade
      }).checkedKeys
    )
  }
  function doUncheck (rowKey: RowKey): void {
    doUpdateCheckedRowKeys(
      treeMateRef.value.uncheck(rowKey, mergedCheckedRowKeysRef.value, {
        cascade: props.cascade
      }).checkedKeys
    )
  }
  function doCheckAll (checkWholeTable: boolean = false): void {
    const { value: column } = selectionColumnRef
    if (!column) return
    const rowKeysToCheck: RowKey[] = []
    ;(checkWholeTable
      ? treeMateRef.value.treeNodes
      : paginatedDataRef.value
    ).forEach((tmNode) => {
      if (!tmNode.disabled) {
        rowKeysToCheck.push(tmNode.key)
      }
    })
    // alway cascade, to emit correct row keys
    doUpdateCheckedRowKeys(
      treeMateRef.value.check(rowKeysToCheck, mergedCheckedRowKeysRef.value, {
        cascade: true
      }).checkedKeys
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
      if (!tmNode.disabled) {
        rowKeysToUncheck.push(tmNode.key)
      }
    })
    // alway cascade, to emit correct row keys
    doUpdateCheckedRowKeys(
      treeMateRef.value.uncheck(
        rowKeysToUncheck,
        mergedCheckedRowKeysRef.value,
        {
          cascade: true
        }
      ).checkedKeys
    )
  }
  return {
    mergedCheckedRowKeySetRef,
    mergedCheckedRowKeysRef,
    mergedInderminateRowKeySetRef,
    someRowsCheckedRef,
    allRowsCheckedRef,
    doUpdateCheckedRowKeys,
    doCheckAll,
    doUncheckAll,
    doCheck,
    doUncheck
  }
}

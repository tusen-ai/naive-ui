import { computed, ComputedRef, ref } from 'vue'
import type {
  DataTableSetupProps,
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
    const sourceKeys =
      checkedRowKeys === undefined
        ? uncontrolledCheckedRowKeysRef.value
        : checkedRowKeys
    if (selectionColumnRef.value?.multiple === false) {
      return {
        checkedKeys: sourceKeys.slice(0, 1),
        indeterminateKeys: []
      }
    }
    return treeMateRef.value.getCheckedKeys(sourceKeys, {
      cascade: props.cascade,
      allowNotLoaded: props.allowCheckingNotLoaded
    })
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
      const { key, disabled } = tmNode
      return total + (!disabled && mergedCheckedRowKeySet.has(key) ? 1 : 0)
    }, 0)
  })
  const countOfCurrentPageDisabledRowsRef = computed(() => {
    return paginatedDataRef.value.filter((item) => item.disabled).length
  })
  const someRowsCheckedRef = computed(() => {
    const { length } = paginatedDataRef.value
    const { value: mergedInderminateRowKeySet } = mergedInderminateRowKeySetRef
    return (
      (countOfCurrentPageCheckedRowsRef.value > 0 &&
        countOfCurrentPageCheckedRowsRef.value <
          length - countOfCurrentPageDisabledRowsRef.value) ||
      paginatedDataRef.value.some((rowData) =>
        mergedInderminateRowKeySet.has(rowData.key)
      )
    )
  })
  const allRowsCheckedRef = computed(() => {
    const { length } = paginatedDataRef.value
    return (
      countOfCurrentPageCheckedRowsRef.value !== 0 &&
      countOfCurrentPageCheckedRowsRef.value ===
        length - countOfCurrentPageDisabledRowsRef.value
    )
  })
  const headerCheckboxDisabledRef = computed(() => {
    return paginatedDataRef.value.length === 0
  })
  function doUpdateCheckedRowKeys (
    keys: RowKey[],
    actionKeys: RowKey[] | undefined,
    action:
    | 'check'
    | 'uncheck'
    | 'checkAll'
    | 'uncheckAll'
    | 'shiftCheck'
    | 'shiftUncheck'
  ): void {
    const {
      'onUpdate:checkedRowKeys': _onUpdateCheckedRowKeys,
      onUpdateCheckedRowKeys,
      onCheckedRowKeysChange
    } = props
    const rows: InternalRowData[] = []
    const { getNode } = treeMateRef.value
    keys.forEach((key) => {
      const row = getNode(key)?.rawNode
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      rows.push(row!)
    })
    const actionRows: InternalRowData[] = []
    actionKeys?.forEach((key) => {
      const row = getNode(key)?.rawNode
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      actionRows.push(row!)
    })
    let row: InternalRowData | undefined
    let shiftRows: InternalRowData[] = []
    if (action === 'shiftCheck' || action === 'shiftUncheck') {
      shiftRows = actionRows
    } else {
      row = actionKeys ? actionRows[0] : undefined
    }
    if (_onUpdateCheckedRowKeys) {
      call(_onUpdateCheckedRowKeys, keys, rows, {
        row,
        shiftRows,
        action
      })
    }
    if (onUpdateCheckedRowKeys) {
      call(onUpdateCheckedRowKeys, keys, rows, {
        row,
        shiftRows,
        action
      })
    }
    if (onCheckedRowKeysChange) {
      call(onCheckedRowKeysChange, keys, rows, {
        row,
        shiftRows,
        action
      })
    }
    uncontrolledCheckedRowKeysRef.value = keys
  }
  function doCheck (rowKey: RowKey, single: boolean = false): void {
    if (props.loading) return
    let checkedKeys: RowKey[] = []
    if (single) {
      checkedKeys = [rowKey]
    } else {
      checkedKeys = treeMateRef.value.check(
        rowKey,
        mergedCheckedRowKeysRef.value,
        {
          cascade: props.cascade,
          allowNotLoaded: props.allowCheckingNotLoaded
        }
      ).checkedKeys
    }
    doUpdateCheckedRowKeys(checkedKeys, [rowKey], 'check')
  }
  function doUncheck (rowKey: RowKey): void {
    if (props.loading) return
    doUpdateCheckedRowKeys(
      treeMateRef.value.uncheck(rowKey, mergedCheckedRowKeysRef.value, {
        cascade: props.cascade,
        allowNotLoaded: props.allowCheckingNotLoaded
      }).checkedKeys,
      [rowKey],
      'uncheck'
    )
  }
  function doShiftCheck (rowKeys: RowKey[]): void {
    if (props.loading) return
    doUpdateCheckedRowKeys(
      treeMateRef.value.check(rowKeys, mergedCheckedRowKeysRef.value, {
        cascade: props.cascade,
        allowNotLoaded: props.allowCheckingNotLoaded
      }).checkedKeys,
      rowKeys,
      'shiftCheck'
    )
  }
  function doShiftUncheck (rowKeys: RowKey[]): void {
    if (props.loading) return
    doUpdateCheckedRowKeys(
      treeMateRef.value.uncheck(rowKeys, mergedCheckedRowKeysRef.value, {
        cascade: props.cascade,
        allowNotLoaded: props.allowCheckingNotLoaded
      }).checkedKeys,
      rowKeys,
      'shiftUncheck'
    )
  }
  function doCheckAll (checkWholeTable: boolean = false): void {
    const { value: column } = selectionColumnRef
    if (!column || props.loading) return
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
        cascade: true,
        allowNotLoaded: props.allowCheckingNotLoaded
      }).checkedKeys,
      undefined,
      'checkAll'
    )
  }
  function doUncheckAll (checkWholeTable: boolean = false): void {
    const { value: column } = selectionColumnRef
    if (!column || props.loading) return
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
          cascade: true,
          allowNotLoaded: props.allowCheckingNotLoaded
        }
      ).checkedKeys,
      undefined,
      'uncheckAll'
    )
  }
  return {
    mergedCheckedRowKeySetRef,
    mergedCheckedRowKeysRef,
    mergedInderminateRowKeySetRef,
    someRowsCheckedRef,
    allRowsCheckedRef,
    headerCheckboxDisabledRef,
    doUpdateCheckedRowKeys,
    doCheckAll,
    doUncheckAll,
    doCheck,
    doUncheck,
    doShiftCheck,
    doShiftUncheck
  }
}

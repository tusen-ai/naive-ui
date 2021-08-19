import { computed, ref, ComputedRef } from 'vue'
import {
  ColumnKey,
  InternalRowData,
  SortOrder,
  SortState,
  TmNode,
  TableBaseColumn,
  TableExpandColumn,
  TableSelectionColumn,
  CompareFn
} from './interface'
import { getFlagOfOrder } from './utils'
import { call } from '../../_utils'
import type { DataTableSetupProps } from './DataTable'

function getMultiplePriority ({
  sorter
}: {
  sorter: TableBaseColumn['sorter']
}): number | false {
  if (typeof sorter === 'object' && typeof sorter.multiple === 'number') {
    return sorter.multiple
  }
  return false
}
function getSortFunction (
  sorter: TableBaseColumn['sorter'],
  columnKey?: ColumnKey
): CompareFn | false {
  if (columnKey && (sorter === undefined || sorter === 'default')) {
    return getDefaultSorterFn(columnKey)
  }
  if (typeof sorter === 'function') {
    return sorter
  }
  if (sorter && typeof sorter === 'object' && sorter.compare) {
    return sorter.compare
  }
  return false
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getDefaultSorterFn (columnKey: ColumnKey) {
  return (row1: InternalRowData, row2: InternalRowData) => {
    const value1 = row1[columnKey]
    const value2 = row2[columnKey]
    if (typeof value1 === 'number' && typeof value2 === 'number') {
      return value1 - value2
    } else if (typeof value1 === 'string' && typeof value2 === 'string') {
      return value1.localeCompare(value2)
    }
    return 0
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useSorter (
  props: DataTableSetupProps,
  {
    dataRelatedColsRef,
    filteredDataRef
  }: {
    dataRelatedColsRef: ComputedRef<
    Array<TableSelectionColumn | TableBaseColumn | TableExpandColumn>
    >
    filteredDataRef: ComputedRef<TmNode[]>
  }
) {
  const uncontrolledSortStateRef = ref<SortState[]>([])

  const mergedSortStateRef = computed(() => {
    // If one of the columns's sort order is false or 'ascend' or 'descend',
    // the table's controll functionality should work in controlled manner.
    const columnsWithControlledSortOrder = dataRelatedColsRef.value.filter(
      (column) =>
        column.type !== 'selection' &&
        column.sorter !== undefined &&
        (column.sortOrder === 'ascend' ||
          column.sortOrder === 'descend' ||
          column.sortOrder === false)
    )
    // if multiple column is controlled sortable, then we need to find a column with active sortOrder
    const columnToSort: TableBaseColumn[] | undefined = (
      columnsWithControlledSortOrder as TableBaseColumn[]
    ).filter((col: TableBaseColumn) => col.sortOrder !== false)
    if (columnToSort.length) {
      return columnToSort.map((column) => {
        return {
          columnKey: column.key,
          // column to sort has controlled sorter
          // sorter && sort order won't be undefined
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          order: column.sortOrder!,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          sorter: column.sorter!
        }
      })
    }
    if (columnsWithControlledSortOrder.length) return []
    return uncontrolledSortStateRef.value
  })

  const sortedDataRef = computed<TmNode[]>(() => {
    const activeSorters = mergedSortStateRef.value
      .slice()
      .sort(
        (a, b) =>
          (getMultiplePriority(b) as number) -
          (getMultiplePriority(a) as number)
      )
    if (activeSorters?.length) {
      const filteredData = filteredDataRef.value.slice()
      return filteredData.sort((tmNode1, tmNode2) => {
        for (let i = 0; i < activeSorters.length; i += 1) {
          const sorterState = activeSorters[i]
          const { columnKey, sorter, order } = sorterState

          const compareFn = getSortFunction(sorter, columnKey)
          if (compareFn && order) {
            const compareResult = compareFn(tmNode1.rawNode, tmNode2.rawNode)

            if (compareResult !== 0) {
              return compareResult * getFlagOfOrder(order)
            }
          }
        }

        return 0
      })
    }
    return filteredDataRef.value
  })
  function doUpdateSorter (sortState: SortState | null): void {
    const {
      'onUpdate:sorter': _onUpdateSorter,
      onUpdateSorter,
      onSorterChange
    } = props
    // Multiple sorter
    if (
      sortState &&
      getMultiplePriority({ sorter: sortState.sorter }) !== false
    ) {
      const index = uncontrolledSortStateRef.value.findIndex(
        (state) =>
          sortState?.columnKey && state.columnKey === sortState.columnKey
      )
      if (index !== undefined && index >= 0) {
        uncontrolledSortStateRef.value.push(sortState)
      } else {
        uncontrolledSortStateRef.value[index] = sortState
      }
    } else if (sortState) {
      // single sorter
      uncontrolledSortStateRef.value = [sortState]
    } else {
      // no sorter
      uncontrolledSortStateRef.value = []
    }
    let updateSorterState: SortState | SortState[] | null =
      uncontrolledSortStateRef.value
    if (updateSorterState.length === 1) {
      updateSorterState = updateSorterState[0]
    } else if (updateSorterState.length === 0) {
      updateSorterState = null
    }
    if (_onUpdateSorter) call(_onUpdateSorter, updateSorterState)
    if (onUpdateSorter) call(onUpdateSorter, updateSorterState)
    if (onSorterChange) call(onSorterChange, updateSorterState)
  }
  function sort (columnKey: ColumnKey, order: SortOrder = 'ascend'): void {
    if (!columnKey) {
      clearSorter()
    } else {
      const columnToSort = dataRelatedColsRef.value.find(
        (column) =>
          column.type !== 'selection' &&
          column.type !== 'expand' &&
          column.key === columnKey
      )
      if (!columnToSort || !columnToSort.sorter) return
      const sorter = columnToSort.sorter
      doUpdateSorter({
        columnKey,
        sorter,
        order: order
      })
    }
  }
  function clearSorter (): void {
    doUpdateSorter(null)
  }
  return {
    clearSorter,
    sort,
    sortedDataRef,
    mergedSortStateRef,
    doUpdateSorter
  }
}

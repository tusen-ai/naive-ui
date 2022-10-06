import { computed, ref, ComputedRef } from 'vue'
import { useMemo, useMergedState } from 'vooks'
import { createTreeMate } from 'treemate'
import type { PaginationProps } from '../../pagination/src/Pagination'
import { call, warn } from '../../_utils'
import type {
  ColumnKey,
  Filter,
  FilterOptionValue,
  FilterState,
  TableBaseColumn,
  TableSelectionColumn,
  InternalRowData,
  TmNode,
  TableExpandColumn,
  RowKey,
  DataTableSetupProps
} from './interface'
import { createShallowClonedObject } from './utils'
import { useSorter } from './use-sorter'

// useTableData combines filter, sorter and pagination
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useTableData (
  props: DataTableSetupProps,
  {
    dataRelatedColsRef
  }: {
    dataRelatedColsRef: ComputedRef<
    Array<TableSelectionColumn | TableBaseColumn | TableExpandColumn>
    >
  }
) {
  const selectionColumnRef = computed<TableSelectionColumn | null>(() => {
    const getSelectionColumn = (
      cols: typeof props.columns
    ): TableSelectionColumn | null => {
      for (let i = 0; i < cols.length; ++i) {
        const col = cols[i]
        if ('children' in col) {
          return getSelectionColumn(col.children)
        } else if (col.type === 'selection') {
          return col
        }
      }
      return null
    }
    return getSelectionColumn(props.columns)
  })

  const treeMateRef = computed(() => {
    const { childrenKey } = props
    return createTreeMate<InternalRowData>(props.data, {
      ignoreEmptyChildren: true,
      getKey: props.rowKey,
      getChildren: (rowData) => rowData[childrenKey] as any,
      getDisabled: (rowData) => {
        if (selectionColumnRef.value?.disabled?.(rowData)) {
          return true
        }
        return false
      }
    })
  })

  const childTriggerColIndexRef = useMemo<number>(() => {
    const { columns } = props
    const { length } = columns
    let firstContentfulColIndex: number | null = null
    for (let i = 0; i < length; ++i) {
      const col = columns[i]
      if (!col.type && firstContentfulColIndex === null) {
        firstContentfulColIndex = i
      }
      if ('tree' in col && col.tree) {
        return i
      }
    }
    return firstContentfulColIndex || 0
  })

  const uncontrolledFilterStateRef = ref<FilterState>({})
  const uncontrolledCurrentPageRef = ref(1)
  const uncontrolledPageSizeRef = ref(10)

  const mergedFilterStateRef = computed<FilterState>(() => {
    const columnsWithControlledFilter = dataRelatedColsRef.value.filter(
      (column) => {
        return (
          column.filterOptionValues !== undefined ||
          column.filterOptionValue !== undefined
        )
      }
    )
    const controlledFilterState: FilterState = {}
    columnsWithControlledFilter.forEach((column) => {
      if (column.type === 'selection' || column.type === 'expand') return
      if (column.filterOptionValues === undefined) {
        controlledFilterState[column.key] = column.filterOptionValue ?? null
      } else {
        controlledFilterState[column.key] = column.filterOptionValues
      }
    })
    const activeFilters = Object.assign(
      createShallowClonedObject(uncontrolledFilterStateRef.value),
      controlledFilterState
    )
    return activeFilters
  })

  const filteredDataRef = computed<TmNode[]>(() => {
    const mergedFilterState = mergedFilterStateRef.value
    const { columns } = props
    function createDefaultFilter (columnKey: ColumnKey): Filter {
      return (filterOptionValue: FilterOptionValue, row: InternalRowData) =>
        !!~String(row[columnKey]).indexOf(String(filterOptionValue))
    }
    const {
      value: { treeNodes: data }
    } = treeMateRef
    const columnEntries: Array<[ColumnKey, TableBaseColumn]> = []
    columns.forEach((column) => {
      if (
        column.type === 'selection' ||
        column.type === 'expand' ||
        'children' in column
      ) {
        return
      }
      columnEntries.push([column.key, column])
    })
    return data
      ? data.filter((tmNode) => {
        const { rawNode: row } = tmNode
        // traverse all filters
        for (const [columnKey, column] of columnEntries) {
          let activeFilterOptionValues = mergedFilterState[columnKey]
          if (activeFilterOptionValues == null) continue
          if (!Array.isArray(activeFilterOptionValues)) {
            activeFilterOptionValues = [activeFilterOptionValues]
          }
          if (!activeFilterOptionValues.length) continue
          // When async, filter won't be set, so data won't be filtered
          const filter =
              column.filter === 'default'
                ? createDefaultFilter(columnKey)
                : column.filter
          if (column && typeof filter === 'function') {
            if (column.filterMode === 'and') {
              if (
                activeFilterOptionValues.some(
                  (filterOptionValue) => !filter(filterOptionValue, row)
                )
              ) {
                return false
              }
            } else {
              if (
                activeFilterOptionValues.some((filterOptionValue) =>
                  filter(filterOptionValue, row)
                )
              ) {
                continue
              } else {
                return false
              }
            }
          }
        }
        return true
      })
      : []
  })

  const {
    sortedDataRef,
    deriveNextSorter,
    mergedSortStateRef,
    sort,
    clearSorter
  } = useSorter(props, {
    dataRelatedColsRef,
    filteredDataRef
  })

  // initialize
  dataRelatedColsRef.value.forEach((column) => {
    if (column.filter) {
      const defaultFilterOptionValues = column.defaultFilterOptionValues
      if (column.filterMultiple) {
        uncontrolledFilterStateRef.value[column.key] =
          defaultFilterOptionValues || []
      } else if (defaultFilterOptionValues !== undefined) {
        // this branch is for compatibility, someone may use `values` in single filter mode
        uncontrolledFilterStateRef.value[column.key] =
          defaultFilterOptionValues === null ? [] : defaultFilterOptionValues
      } else {
        uncontrolledFilterStateRef.value[column.key] =
          column.defaultFilterOptionValue ?? null
      }
    }
  })

  const controlledCurrentPageRef = computed(() => {
    const { pagination } = props
    if (pagination === false) return undefined
    return pagination.page
  })
  const controlledPageSizeRef = computed(() => {
    const { pagination } = props
    if (pagination === false) return undefined
    return pagination.pageSize
  })

  const _mergedCurrentPageRef = useMergedState(
    controlledCurrentPageRef,
    uncontrolledCurrentPageRef
  )

  const mergedPageSizeRef = useMergedState(
    controlledPageSizeRef,
    uncontrolledPageSizeRef
  )

  const boundedMergedCurrentPageRef = useMemo<number>(() => {
    const page = _mergedCurrentPageRef.value
    return props.remote
      ? page
      : Math.max(
        1,
        Math.min(
          Math.ceil(filteredDataRef.value.length / mergedPageSizeRef.value),
          page
        )
      )
  })

  const mergedPageCountRef = computed(() => {
    const { pagination } = props
    if (pagination) {
      const { pageCount } = pagination
      if (pageCount !== undefined) return pageCount
    }
    return undefined
  })

  const paginatedDataRef = computed<TmNode[]>(() => {
    if (props.remote) return treeMateRef.value.treeNodes
    if (!props.pagination) return sortedDataRef.value
    const pageSize = mergedPageSizeRef.value
    const startIndex = (boundedMergedCurrentPageRef.value - 1) * pageSize
    return sortedDataRef.value.slice(startIndex, startIndex + pageSize)
  })

  const rawPaginatedDataRef = computed<InternalRowData[]>(() => {
    return paginatedDataRef.value.map((tmNode) => tmNode.rawNode)
  })

  function mergedOnUpdatePage (page: number): void {
    const { pagination } = props
    if (pagination) {
      const {
        onChange,
        'onUpdate:page': _onUpdatePage,
        onUpdatePage
      } = pagination
      if (onChange) call(onChange, page)
      if (onUpdatePage) call(onUpdatePage, page)
      if (_onUpdatePage) call(_onUpdatePage, page)
      doUpdatePage(page)
    }
  }
  function mergedOnUpdatePageSize (pageSize: number): void {
    const { pagination } = props
    if (pagination) {
      const {
        onPageSizeChange,
        'onUpdate:pageSize': _onUpdatePageSize,
        onUpdatePageSize
      } = pagination
      if (onPageSizeChange) call(onPageSizeChange, pageSize)
      if (onUpdatePageSize) call(onUpdatePageSize, pageSize)
      if (_onUpdatePageSize) call(_onUpdatePageSize, pageSize)
      doUpdatePageSize(pageSize)
    }
  }
  const mergedItemCountRef = computed(() => {
    if (props.remote) {
      const { pagination } = props
      if (pagination) {
        const { itemCount } = pagination
        if (itemCount !== undefined) return itemCount
      }
      return undefined
    }
    return filteredDataRef.value.length
  })
  const mergedPaginationRef = computed<PaginationProps>(() => {
    return {
      ...props.pagination,
      // reset deprecated methods
      onChange: undefined,
      onUpdatePage: undefined,
      onUpdatePageSize: undefined,
      onPageSizeChange: undefined,
      'onUpdate:page': mergedOnUpdatePage,
      'onUpdate:pageSize': mergedOnUpdatePageSize,
      // writing merged props after pagination to avoid
      // pagination[key] === undefined
      // key still exists but value is undefined
      page: boundedMergedCurrentPageRef.value,
      pageSize: mergedPageSizeRef.value,
      pageCount:
        mergedItemCountRef.value === undefined
          ? mergedPageCountRef.value
          : undefined,
      itemCount: mergedItemCountRef.value
    }
  })

  function doUpdatePage (page: number): void {
    const { 'onUpdate:page': _onUpdatePage, onPageChange, onUpdatePage } = props
    if (onUpdatePage) call(onUpdatePage, page)
    if (_onUpdatePage) call(_onUpdatePage, page)
    if (onPageChange) call(onPageChange, page)
    uncontrolledCurrentPageRef.value = page
  }
  function doUpdatePageSize (pageSize: number): void {
    const {
      'onUpdate:pageSize': _onUpdatePageSize,
      onPageSizeChange,
      onUpdatePageSize
    } = props
    if (onPageSizeChange) call(onPageSizeChange, pageSize)
    if (onUpdatePageSize) call(onUpdatePageSize, pageSize)
    if (_onUpdatePageSize) call(_onUpdatePageSize, pageSize)
    uncontrolledPageSizeRef.value = pageSize
  }

  function doUpdateFilters (
    filters: FilterState,
    sourceColumn: TableBaseColumn
  ): void {
    const {
      onUpdateFilters,
      'onUpdate:filters': _onUpdateFilters,
      onFiltersChange
    } = props
    if (onUpdateFilters) call(onUpdateFilters, filters, sourceColumn)
    if (_onUpdateFilters) call(_onUpdateFilters, filters, sourceColumn)
    if (onFiltersChange) call(onFiltersChange, filters, sourceColumn)
    uncontrolledFilterStateRef.value = filters
  }

  function onUnstableColumnResize (
    resizedWidth: number,
    limitedWidth: number,
    column: TableBaseColumn,
    getColumnWidth: (key: ColumnKey) => number | undefined
  ): void {
    props.onUnstableColumnResize?.(
      resizedWidth,
      limitedWidth,
      column,
      getColumnWidth
    )
  }

  function page (page: number): void {
    doUpdatePage(page)
  }
  function clearFilter (): void {
    clearFilters()
  }
  function clearFilters (): void {
    filters({})
  }
  function filters (filters: FilterState | null): void {
    filter(filters)
  }
  function filter (filters: FilterState | null): void {
    if (!filters) {
      uncontrolledFilterStateRef.value = {}
    } else if (filters) {
      uncontrolledFilterStateRef.value = createShallowClonedObject(filters)
    } else if (__DEV__) {
      warn('data-table', '`filters` is not an object')
    }
  }
  return {
    treeMateRef,
    mergedCurrentPageRef: boundedMergedCurrentPageRef,
    mergedPaginationRef,
    paginatedDataRef,
    rawPaginatedDataRef,
    mergedFilterStateRef,
    mergedSortStateRef,
    hoverKeyRef: ref<RowKey | null>(null),
    selectionColumnRef,
    childTriggerColIndexRef,
    doUpdateFilters,
    deriveNextSorter,
    doUpdatePageSize,
    doUpdatePage,
    onUnstableColumnResize,
    // exported methods
    filter,
    filters,
    clearFilter,
    clearFilters,
    clearSorter,
    page,
    sort
  }
}

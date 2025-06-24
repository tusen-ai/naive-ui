<markdown>
  # Async
</markdown>

<script lang="ts" setup>
import type {
  DataTableColumn,
  DataTableColumns,
  DataTableFilterState,
  DataTableSortOrder,
  DataTableSortState,
  PaginationInfo
} from 'naive-ui'
import type { FilterOptionValue } from '../../src/interface'
import { onMounted, reactive, ref } from 'vue'

interface RowData {
  column1: number
  column2: number
  column3: string
}

const column1: DataTableColumn<RowData> = {
  title: 'column1',
  key: 'column1',
  sorter: true,
  sortOrder: false
}

const column2: DataTableColumn<RowData> = {
  title: 'column2',
  key: 'column2',
  filter: true,
  filterOptionValues: [],
  filterOptions: [
    {
      label: 'Value1',
      value: 1
    },
    {
      label: 'Value2',
      value: 2
    }
  ]
}

const columns: DataTableColumns<RowData> = [
  column1,
  column2,
  {
    title: 'Column3',
    key: 'column3'
  }
]

const data = Array.from({ length: 987 })
  .fill(null)
  .map((_, index) => {
    return {
      column1: index,
      column2: (index % 2) + 1,
      column3: `a${index}`
    }
  })

interface QueryParams {
  page: number
  pageSize: number
  order?: DataTableSortOrder
  filterValues?: FilterOptionValue[] | null | undefined
}

interface QueryResult {
  pageCount: number
  data: RowData[]
  total: number
}

function query({
  page,
  pageSize = 10,
  order = 'ascend',
  filterValues = []
}: QueryParams): Promise<QueryResult> {
  return new Promise((resolve) => {
    const copiedData = data.map(v => v)
    const orderedData = order === 'descend' ? copiedData.reverse() : copiedData
    const filteredData = filterValues?.length
      ? orderedData.filter(row => filterValues?.includes(row.column2))
      : orderedData
    const pagedData = filteredData.slice((page - 1) * pageSize, page * pageSize)
    const total = filteredData.length
    const pageCount = Math.ceil(filteredData.length / pageSize)
    setTimeout(
      () =>
        resolve({
          pageCount,
          data: pagedData,
          total
        }),
      1500
    )
  })
}

const dataRef = ref<RowData[]>([])
const loadingRef = ref(true)
const column1Reactive = reactive(column1)
const column2Reactive = reactive(column2)
const paginationReactive = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  itemCount: 0,
  prefix({ itemCount }: PaginationInfo) {
    return `Total is ${itemCount}.`
  }
})

onMounted(() => {
  query({
    page: paginationReactive.page,
    pageSize: paginationReactive.pageSize,
    order: column1Reactive.sortOrder,
    filterValues: column2Reactive.filterOptionValues
  }).then((data) => {
    dataRef.value = data.data
    paginationReactive.pageCount = data.pageCount
    paginationReactive.itemCount = data.total
    loadingRef.value = false
  })
})

function rowKey(rowData: RowData) {
  return rowData.column1
}

function handleSorterChange(sorter: DataTableSortState) {
  if (!sorter || sorter.columnKey === 'column1') {
    if (!loadingRef.value) {
      loadingRef.value = true
      query({
        page: paginationReactive.page,
        pageSize: paginationReactive.pageSize,
        order: !sorter ? false : sorter.order,
        filterValues: column2Reactive.filterOptionValues
      }).then((data) => {
        column1Reactive.sortOrder = !sorter ? false : sorter.order
        dataRef.value = data.data
        paginationReactive.pageCount = data.pageCount
        paginationReactive.itemCount = data.total
        loadingRef.value = false
      })
    }
  }
}

function handleFiltersChange(filters: DataTableFilterState) {
  if (!loadingRef.value) {
    loadingRef.value = true
    const filterValues = Array.isArray(filters.column2) ? filters.column2 : []
    query({
      page: paginationReactive.page,
      pageSize: paginationReactive.pageSize,
      order: column1Reactive.sortOrder,
      filterValues
    }).then((data) => {
      column2Reactive.filterOptionValues = filterValues
      dataRef.value = data.data
      paginationReactive.pageCount = data.pageCount
      paginationReactive.itemCount = data.total
      loadingRef.value = false
    })
  }
}

function handlePageChange(currentPage: number) {
  if (!loadingRef.value) {
    loadingRef.value = true
    query({
      page: currentPage,
      pageSize: paginationReactive.pageSize,
      order: column1Reactive.sortOrder,
      filterValues: column2Reactive.filterOptionValues
    }).then((data) => {
      dataRef.value = data.data
      paginationReactive.page = currentPage
      paginationReactive.pageCount = data.pageCount
      paginationReactive.itemCount = data.total
      loadingRef.value = false
    })
  }
}
</script>

<template>
  <n-data-table
    remote
    :columns="columns"
    :data="dataRef"
    :loading="loadingRef"
    :pagination="paginationReactive"
    :row-key="rowKey"
    @update:sorter="handleSorterChange"
    @update:filters="handleFiltersChange"
    @update:page="handlePageChange"
  />
</template>

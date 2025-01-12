<markdown>
# Controlled multi-column sorting

If column object's `sortOrder` is set to `'ascend'`, `'descend'` or `false`, the data table would be in controlled state.

If you only want UI to display multiple sort state, you can leave `compare` empty.
</markdown>

<script lang="ts">
import type {
  DataTableColumnKey,
  DataTableColumns,
  DataTableSortOrder,
  DataTableSortState
} from 'naive-ui'
import { computed, defineComponent, ref } from 'vue'

interface RowData {
  key: number
  name: string
  age: number
  chinese: number
  math: number
  english: number
}

const data: RowData[] = [
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    chinese: 98,
    math: 60,
    english: 70
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42,
    chinese: 98,
    math: 66,
    english: 89
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    chinese: 98,
    math: 66,
    english: 89
  },
  {
    key: 3,
    name: 'Jim Red',
    age: 32,
    chinese: 88,
    math: 99,
    english: 89
  }
]

export default defineComponent({
  setup() {
    const sortStatesRef = ref<DataTableSortState[]>([])
    const sortKeyMapOrderRef = computed<
      Record<DataTableColumnKey, DataTableSortOrder>
    >(() =>
      sortStatesRef.value.reduce(
        (
          result: Record<DataTableColumnKey, DataTableSortOrder>,
          { columnKey, order }
        ) => {
          result[columnKey] = order
          return result
        },
        {}
      )
    )
    const paginationRef = ref({ pageSize: 5 })

    const columnsRef = computed<DataTableColumns<RowData>>(() => [
      {
        title: 'Name',
        key: 'name'
      },
      {
        title: 'Age',
        key: 'age',
        sortOrder: sortKeyMapOrderRef.value.age || false,
        sorter(rowA, rowB) {
          return rowA.age - rowB.age
        }
      },
      {
        title: 'Chinese Score',
        key: 'chinese',
        sortOrder: sortKeyMapOrderRef.value.chinese || false,
        sorter: {
          compare: (a, b) => a.chinese - b.chinese,
          multiple: 3
        }
      },
      {
        title: 'Math Score',
        key: 'math',
        sortOrder: sortKeyMapOrderRef.value.math || false,
        sorter: {
          compare: (a, b) => a.math - b.math,
          multiple: 2
        }
      },
      {
        title: 'English Score',
        sortOrder: sortKeyMapOrderRef.value.english || false,
        key: 'english',
        sorter: {
          compare: (a, b) => a.english - b.english,
          multiple: 1
        }
      }
    ])

    function handleUpdateSorter(sorters: DataTableSortState[]) {
      console.log(sorters)
      sortStatesRef.value = ([] as DataTableSortState[]).concat(sorters)
    }
    return {
      columns: columnsRef,
      handleUpdateSorter,
      data,
      pagination: paginationRef
    }
  }
})
</script>

<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :pagination="pagination"
    @update:sorter="handleUpdateSorter"
  />
</template>

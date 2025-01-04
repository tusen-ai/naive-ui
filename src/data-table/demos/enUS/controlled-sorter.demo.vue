<markdown>
# Controlled sorter

If one of the column objects' `sortOrder` is set to `'ascend'`, `'descend'` or `false`. The sorting behavior the table will be in a controlled manner. If multiple columns' `sortOrder` are set to `'ascend'` or `'descend'`, only first column of them will be applied.
</markdown>

<script lang="ts">
import type {
  DataTableBaseColumn,
  DataTableSortOrder,
  DataTableSortState
} from 'naive-ui'
import { defineComponent, reactive, ref } from 'vue'

interface RowData {
  key: number
  name: string
  age: number
  address: string
}

const nameColumn: DataTableBaseColumn<RowData> = {
  title: 'Name',
  key: 'name',
  sortOrder: false,
  sorter: 'default'
}

const ageColumn: DataTableBaseColumn<RowData> = {
  title: 'Age',
  key: 'age',
  sortOrder: false,
  sorter(rowA, rowB) {
    return rowA.age - rowB.age
  }
}

const columns: DataTableBaseColumn<RowData>[] = [
  nameColumn,
  ageColumn,
  {
    title: 'Address',
    key: 'address',
    defaultFilterOptionValues: ['London', 'New York'],
    filterOptions: [
      {
        label: 'London',
        value: 'London'
      },
      {
        label: 'New York',
        value: 'New York'
      }
    ],
    filter(value, row) {
      return row.address.includes(value as string)
    }
  }
]

const data = [
  {
    key: 0,
    name: 'John Brown',
    age: 38,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 36,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: 3,
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park'
  }
]

export default defineComponent({
  setup() {
    const nameColumnReactive = reactive(nameColumn)
    const ageColumnReactive = reactive(ageColumn)
    const columnsRef = ref<DataTableBaseColumn<RowData>[]>(columns)

    function handleSorterChange(sorter: DataTableSortState) {
      columnsRef.value.forEach((column: DataTableBaseColumn<RowData>) => {
        /** column.sortOrder !== undefined means it is uncontrolled */
        if (column.sortOrder === undefined)
          return
        if (!sorter) {
          column.sortOrder = false
          return
        }
        if (column.key === sorter.columnKey)
          column.sortOrder = sorter.order
        else column.sortOrder = false
      })
    }

    return {
      data,
      columns: columnsRef,
      nameColumn: nameColumnReactive,
      ageColumn: ageColumnReactive,
      pagination: { pageSize: 5 },
      sortName(order: DataTableSortOrder) {
        nameColumnReactive.sortOrder = order
      },
      clearSorter() {
        nameColumnReactive.sortOrder = false
        ageColumnReactive.sortOrder = false
      },
      handleSorterChange
    }
  }
})
</script>

<template>
  <n-space vertical :size="12">
    <n-space>
      <n-button @click="sortName('ascend')">
        Sort By Name (Ascend)
      </n-button>
      <n-button @click="sortName('descend')">
        Sort By Name (Descend)
      </n-button>
      <n-button @click="clearSorter">
        Clear Sorter
      </n-button>
    </n-space>
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      @update:sorter="handleSorterChange"
    />
  </n-space>
</template>

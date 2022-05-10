<markdown>
# Filter page state

Set `pagination-behavior-on-filter` to control the behavior (whether to stay at current page of return to the first page) on filter state changed.

If table stays on the current page and the total amount of filtered data cannot reach the current page, the last page of data would be shown.
</markdown>

<template>
  <n-data-table
    pagination-behavior-on-filter="first"
    :columns="columns"
    :data="data"
    :pagination="pagination"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { DataTableColumns } from 'naive-ui'

type RowData = {
  key: number
  name: string
  age: number
  address: string
}

const columns: DataTableColumns<RowData> = [
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Age',
    key: 'age'
  },
  {
    title: 'Address',
    key: 'address',
    defaultFilterOptionValues: [],
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
    filter (value, row) {
      return !!~row.address.indexOf(String(value))
    }
  }
]

const data: RowData[] = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: 3,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: 4,
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park'
  }
]

export default defineComponent({
  setup () {
    return {
      data,
      columns,
      pagination: { pageSize: 3 }
    }
  }
})
</script>

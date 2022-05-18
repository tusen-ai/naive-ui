<markdown>
# Summary

Use `summary` prop to render summary.
</markdown>

<template>
  <n-data-table :columns="columns" :data="data" :summary="summary" />
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import type { DataTableColumns, DataTableCreateSummary } from 'naive-ui'

type RowData = {
  key: number
  name: string
  age: number
  address: string
}

const createColumns = (): DataTableColumns<RowData> => {
  return [
    {
      type: 'selection'
    },
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
      key: 'address'
    }
  ]
}

const createData = (): RowData[] => [
  {
    key: 0,
    name: 'John Brown',
    age: 32,
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
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }
]

const createSummary: DataTableCreateSummary = (pageData) => {
  return {
    name: {
      value: h(
        'span',
        { style: { color: 'red' } },
        (pageData as RowData[]).reduce(
          (prevValue, row) => prevValue + row.age,
          0
        )
      ),
      colSpan: 3
    }
  }
}

export default defineComponent({
  setup () {
    return {
      summary: createSummary,
      data: createData(),
      columns: createColumns()
    }
  }
})
</script>

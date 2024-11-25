<markdown>
# Summary

Use `summary` prop to render summary.
</markdown>

<script lang="ts">
import type { DataTableColumns, DataTableCreateSummary } from 'naive-ui'
import { defineComponent, h } from 'vue'

interface RowData {
  key: number
  name: string
  age: number
  address: string
}

function createColumns(): DataTableColumns<RowData> {
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

function createData(): RowData[] {
  return [
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
}

const createSummary: DataTableCreateSummary = (pageData) => {
  return {
    name: {
      value: h(
        'span',
        { style: { color: 'red' } },
        (pageData as unknown as RowData[]).reduce(
          (prevValue, row) => prevValue + row.age,
          0
        )
      ),
      colSpan: 3
    }
  }
}

export default defineComponent({
  setup() {
    return {
      summary: createSummary,
      data: createData(),
      columns: createColumns()
    }
  }
})
</script>

<template>
  <n-data-table :columns="columns" :data="data" :summary="summary" />
</template>

<markdown>
# 条纹

使用 `striped` 属性渲染条纹，使得表格明暗交替。
</markdown>

<script lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { defineComponent } from 'vue'

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

export default defineComponent({
  setup() {
    return {
      data: createData(),
      columns: createColumns()
    }
  }
})
</script>

<template>
  <n-data-table :columns="columns" :data="data" striped />
</template>

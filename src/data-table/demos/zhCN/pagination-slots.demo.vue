<markdown>
# 表格分页器插槽
</markdown>

<template>
  <n-data-table :columns="columns" :data="data" :pagination="pagination">
    <template #pagination-prev>
      往回走
    </template>
    <template #pagination-next>
      继续走
    </template>
  </n-data-table>
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
    key: 'address'
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

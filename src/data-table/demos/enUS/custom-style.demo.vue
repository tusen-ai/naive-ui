<markdown>
# Custom style

Column: Set `className` property on column object to assign a class name to a certain column.
</markdown>

<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :row-class-name="rowClassName"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

type RowData = {
  key: number
  name: string
  age: number
  address: string
}

const data: RowData[] = [
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

export default defineComponent({
  setup () {
    return {
      data,
      columns: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age',
          className: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      rowClassName (row: RowData) {
        if (row.age > 32) {
          return 'too-old'
        }
        return ''
      }
    }
  }
})
</script>

<style>
:deep(.too-old td) {
  color: rgba(255, 0, 0, 0.75) !important;
}
:deep(.age) {
  color: rgba(0, 128, 0, 0.75) !important;
}
:deep(.too-old .age) {
  color: rgba(0, 0, 128, 0.75) !important;
}
</style>

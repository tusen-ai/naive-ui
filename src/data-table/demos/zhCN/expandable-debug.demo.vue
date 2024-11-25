<markdown>
# Expandable debug
</markdown>

<script lang="ts">
import type { DataTableColumn } from 'naive-ui'
import { NButton, NDataTable } from 'naive-ui'
import { defineComponent, h, ref } from 'vue'

export interface RowData {
  key: number
  name: string
  age: number
  address: string
  show?: number
}

export type RowData1 = RowData & {
  data: RowData[]
}

export default defineComponent({
  setup() {
    const data = ref<RowData1[]>([
      {
        key: 0,
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        data: [
          {
            key: 0,
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            show: 0
          },
          {
            key: 1,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            show: 0
          },
          {
            key: 2,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            show: 0
          }
        ]
      },
      {
        key: 1,
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        data: []
      },
      {
        key: 2,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        data: []
      }
    ])
    const handleDelete = (key: number) => {
      data.value[0].data[key].show = -1
    }
    const dataColumns: DataTableColumn<RowData>[] = [
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
      },
      {
        title: 'Operation',
        key: 'operation',
        render(rowData) {
          return h(
            NButton,
            {
              text: true,
              onClick: () => handleDelete(rowData.key)
            },
            { default: () => 'Delete' }
          )
        }
      }
    ]
    const columns1: DataTableColumn<RowData1>[] = [
      {
        type: 'expand',
        expandable: (rowData) => {
          return rowData.data.filter(item => item.show !== -1).length > 0
        },
        renderExpand: (rowData) => {
          if (rowData.data.filter(item => item.show !== -1).length > 0) {
            return h(NDataTable, {
              data: rowData.data.filter(item => item.show !== -1),
              index: rowData.key,
              columns: dataColumns
            })
          }
          return undefined
        }
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

    return {
      columns1,
      data,
      handleDelete
    }
  }
})
</script>

<template>
  <n-data-table :columns="columns1" :data="data" default-expand-all />
</template>

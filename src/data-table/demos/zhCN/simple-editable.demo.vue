<markdown>
# 简单的可编辑表格
</markdown>

<script lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { NInput } from 'naive-ui'
import { defineComponent, h, ref } from 'vue'

interface RowData {
  key: number
  name: string
  age: string
  address: string
}

function createData(): RowData[] {
  return [
    {
      key: 0,
      name: 'John Brown',
      age: '32',
      address: 'New York No. 1 Lake Park'
    },
    {
      key: 1,
      name: 'Jim Green',
      age: '42',
      address: 'London No. 1 Lake Park'
    },
    {
      key: 2,
      name: 'Joe Black',
      age: '32',
      address: 'Sidney No. 1 Lake Park'
    }
  ]
}

export default defineComponent({
  setup() {
    const data = ref(createData())
    const createColumns = (): DataTableColumns<RowData> => [
      {
        title: 'Name',
        key: 'name',
        render(row, index) {
          return h(NInput, {
            value: row.name,
            onUpdateValue(v) {
              data.value[index].name = v
            }
          })
        }
      },
      {
        title: 'Age',
        key: 'age',
        render(row, index) {
          return h(NInput, {
            value: row.age,
            onUpdateValue(v) {
              data.value[index].age = v
            }
          })
        }
      },
      {
        title: 'Address',
        key: 'address',
        render(row, index) {
          return h(NInput, {
            value: row.address,
            onUpdateValue(v) {
              data.value[index].address = v
            }
          })
        }
      }
    ]
    return {
      data,
      columns: createColumns(),
      pagination: {
        pageSize: 10
      }
    }
  }
})
</script>

<template>
  <n-data-table :columns="columns" :data="data" :pagination="pagination" />
  <pre>{{ JSON.stringify(data, null, 2) }}</pre>
</template>

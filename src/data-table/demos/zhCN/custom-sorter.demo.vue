<markdown>
# 自定义排序
</markdown>

<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { NDataTable } from 'naive-ui'
import { ref } from 'vue'

interface RowData {
  key: number
  name: string
  age: number
  address: string
  score: number
}

function createColumns(): DataTableColumns<RowData> {
  return [
    {
      title: 'Name',
      key: 'name'
    },
    {
      title: 'Age ( 仅升序和降序切换 )',
      key: 'age',
      sorter: (row1, row2) => row1.age - row2.age,
      defaultSortOrder: 'ascend',
      customNextSortOrder: (order) => {
        if (order === 'ascend')
          return 'descend'
        return 'ascend'
      }
    },
    {
      title: 'Score ( 常规三态排序 )',
      key: 'score',
      sorter: (row1, row2) => row1.score - row2.score
    },
    {
      title: 'Address',
      key: 'address'
    }
  ]
}

const data = [
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    score: 89
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    score: 92
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    score: 78
  }
]

const dataTableRef = ref(null)
const columns = createColumns()
const pagination = ref({ pageSize: 10 })
</script>

<template>
  <NDataTable
    ref="dataTableRef"
    :columns="columns"
    :data="data"
    :pagination="pagination"
  />
</template>

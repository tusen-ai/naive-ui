<markdown>
  # Multiple column sorting

  Set `multiple` and `compare` on `sorter` to enable multiple column sorting. `multiple` is the priority of sorting (larger value means higher priority).
  </markdown>

<script lang="ts" setup>
import type { DataTableColumns, DataTableInst } from 'naive-ui'
import { ref } from 'vue'

interface RowData {
  key: number
  name: string
  age: number
  address: string
  chinese: number
  math: number
  english: number
}

const columns: DataTableColumns<RowData> = [
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Age',
    key: 'age',
    sorter: (row1, row2) => row1.age - row2.age
  },
  {
    title: 'Chinese Score',
    key: 'chinese',
    defaultSortOrder: false,
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3
    }
  },
  {
    title: 'Math Score',
    defaultSortOrder: false,
    key: 'math',
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2
    }
  },
  {
    title: 'English Score',
    defaultSortOrder: false,
    key: 'english',
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1
    }
  },
  {
    title: 'Address',
    key: 'address',
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
      return Boolean(~row.address.indexOf(value as string))
    }
  }
]

const data: RowData[] = [
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    chinese: 98,
    math: 60,
    english: 70
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    chinese: 98,
    math: 66,
    english: 89
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    chinese: 98,
    math: 66,
    english: 89
  },
  {
    key: 3,
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
    chinese: 88,
    math: 99,
    english: 89
  }
]

const dataTableInst = ref<DataTableInst | null>(null)
const pagination = ref({ pageSize: 5 })

function filterAddress() {
  dataTableInst.value?.filter({
    address: ['London']
  })
}

function sortName() {
  dataTableInst.value?.sort('name', 'ascend')
}

function clearFilters() {
  dataTableInst.value?.clearFilters()
}

function clearSorter() {
  dataTableInst.value?.clearSorter()
}
</script>

<template>
  <n-space vertical :size="12">
    <n-space>
      <n-button @click="sortName">
        Sort By Name (Ascend)
      </n-button>
      <n-button @click="filterAddress">
        Filter Address (London)
      </n-button>
      <n-button @click="clearFilters">
        Clear Filters
      </n-button>
      <n-button @click="clearSorter">
        Clear Sorter
      </n-button>
    </n-space>
    <n-data-table
      ref="dataTableInst"
      :columns="columns"
      :data="data"
      :pagination="pagination"
    />
  </n-space>
</template>

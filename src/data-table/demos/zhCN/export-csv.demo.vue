<markdown>
# 导出 CSV
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { DataTableColumns, DataTableInst } from 'naive-ui'
import type { RowData } from '../../src/interface'

interface Song {
  key: number
  name: string
  age: number
  address: string
}

const columns: DataTableColumns<RowData> = [
  {
    title: 'Name',
    key: 'name',
    sorter: 'default'
  },
  {
    title: 'Age',
    key: 'age',
    sorter: (row1: object, row2: object) =>
      (row1 as Song).age - (row2 as Song).age
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
    filter: (value: string | number, row: object) => {
      return !!~(row as Song).address.indexOf(value as string)
    }
  }
]

const data: Song[] = [
  {
    key: 0,
    name: 'John Brown',
    age: 18,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 28,
    address: 'London No. 1 Lake Park'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 38,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: 3,
    name: 'Jim Red',
    age: 48,
    address: 'London No. 2 Lake Park'
  }
]

export default defineComponent({
  setup() {
    const tableRef = ref<DataTableInst>()

    const downloadCsv = () =>
      tableRef.value?.downloadCsv({ fileName: 'data-table' })

    const exportSorterAndFilterCsv = () =>
      tableRef.value?.downloadCsv({
        fileName: 'sorter-filter',
        keepOriginalData: false
      })

    return {
      data,
      tableRef,
      downloadCsv,
      exportSorterAndFilterCsv,
      columns,
      pagination: false as const
    }
  }
})
</script>

<template>
  <n-space vertical :size="12">
    <n-space>
      <n-button @click="downloadCsv">
        导出 CSV（原始数据）
      </n-button>
      <n-button @click="exportSorterAndFilterCsv">
        导出 CSV（展示的数据）
      </n-button>
    </n-space>
    <n-data-table
      ref="tableRef"
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :bordered="false"
    />
  </n-space>
</template>

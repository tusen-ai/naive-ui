<markdown>
# 导出 CSV

你可以用 `downloadCsv` 方法导出表格数据为 CSV 文件。

如果默认的 CSV 生成逻辑不能满足你的需求，例如 `title` 使用了渲染函数，或者需要调整每个单元格的数据格式，你可以用 `get-csv-header` 和 `get-csv-cell` 属性自定义导出的表头和单元格。
</markdown>

<script lang="ts">
import type {
  DataTableColumns,
  DataTableGetCsvCell,
  DataTableGetCsvHeader,
  DataTableInst,
  DataTableRowData
} from 'naive-ui'
import { defineComponent, h, ref } from 'vue'

interface Song {
  key: number
  name: string
  age: number
  address: string
}

const columns: DataTableColumns<DataTableRowData> = [
  {
    title: 'Name',
    key: 'name',
    sorter: 'default',
    render(rowData) {
      return h('span', { style: { color: 'blue' } }, rowData.name)
    }
  },
  {
    title: () => h('span', { style: { color: 'red' } }, 'Age'),
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

    const getCsvCell: DataTableGetCsvCell = (value, _, column) => {
      if (column.key === 'age') {
        return `${value} years old`
      }
      return value
    }

    const getCsvHeader: DataTableGetCsvHeader = (col) => {
      if (typeof col.title === 'function') {
        return col.key === 'age' ? 'Age' : 'Unknown'
      }
      else {
        return col.title || 'Unknown'
      }
    }

    return {
      data,
      tableRef,
      downloadCsv,
      exportSorterAndFilterCsv,
      columns,
      pagination: false as const,
      getCsvCell,
      getCsvHeader
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
      :get-csv-cell="getCsvCell"
      :get-csv-header="getCsvHeader"
    />
  </n-space>
</template>

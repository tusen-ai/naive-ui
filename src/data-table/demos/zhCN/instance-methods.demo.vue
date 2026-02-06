<markdown>
# 实例方法

通过 ref 获取表格实例，可以编程式地控制过滤、排序、滚动、选择、展开等状态。
</markdown>

<script lang="ts" setup>
import type { DataTableColumns, DataTableInst, DataTableRowKey } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

interface RowData {
  key: number
  name: string
  age: number
  address: string
}

const message = useMessage()
const tableRef = ref<DataTableInst | null>(null)
const checkedRowKeysRef = ref<DataTableRowKey[]>([])

const columns: DataTableColumns<RowData> = [
  {
    type: 'selection'
  },
  {
    type: 'expand',
    renderExpand: (rowData) => {
      return `${rowData.name} 的详细地址是 ${rowData.address}。`
    }
  },
  {
    title: 'Name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name)
  },
  {
    title: 'Age',
    key: 'age',
    sorter: (a, b) => a.age - b.age
  },
  {
    title: 'Address',
    key: 'address',
    filterOptions: [
      { label: 'New York', value: 'New York' },
      { label: 'London', value: 'London' },
      { label: 'Sidney', value: 'Sidney' }
    ],
    filter(value, row) {
      return row.address.includes(value as string)
    }
  }
]

const data: RowData[] = Array.from({ length: 20 }).map((_, index) => ({
  key: index,
  name: `Edward King ${index}`,
  age: 20 + (index % 30),
  address: `${['New York', 'London', 'Sidney'][index % 3]} No. ${index} Lake Park`
}))

function handleCheck(rowKeys: DataTableRowKey[]) {
  checkedRowKeysRef.value = rowKeys
}

function handleSetFilters() {
  tableRef.value?.filters({ address: ['London'] })
}

function handleSort() {
  tableRef.value?.sort('age', 'descend')
}

function handleReset() {
  tableRef.value?.clearFilters()
  tableRef.value?.clearSorter()
}

function handleScrollTo() {
  tableRef.value?.scrollTo({ top: 0 })
}

function handleToggleAllSelection() {
  tableRef.value?.toggleAllSelection()
}

function handleClearSelection() {
  tableRef.value?.clearSelection()
}

function handleToggleRowSelection() {
  tableRef.value?.toggleRowSelection(0)
}

function handleToggleRowExpansion() {
  tableRef.value?.toggleRowExpansion(0)
}

function handleGetSelectionRows() {
  const rows = (tableRef.value?.getSelectionRows()
    ?? []) as unknown as RowData[]
  message.info(
    rows.length ? `选中: ${rows.map(r => r.name).join(', ')}` : '未选中任何行'
  )
}

function handleSetCurrentRow() {
  if (checkedRowKeysRef.value.length) {
    tableRef.value?.setCurrentRow(null)
  }
  else {
    tableRef.value?.setCurrentRow(2)
  }
}
</script>

<template>
  <n-space vertical>
    <n-space>
      <n-button size="small" @click="handleSetFilters">
        设置过滤
      </n-button>
      <n-button size="small" @click="handleSort">
        排序
      </n-button>
      <n-button size="small" @click="handleReset">
        重置过滤和排序
      </n-button>
      <n-button size="small" @click="handleScrollTo">
        滚动到顶部
      </n-button>
      <n-button size="small" @click="handleToggleAllSelection">
        切换全选
      </n-button>
      <n-button size="small" @click="handleClearSelection">
        清除选择
      </n-button>
      <n-button size="small" @click="handleToggleRowSelection">
        切换行选中
      </n-button>
      <n-button size="small" @click="handleToggleRowExpansion">
        切换行展开
      </n-button>
      <n-button size="small" @click="handleGetSelectionRows">
        获取选中行
      </n-button>
      <n-button size="small" @click="handleSetCurrentRow">
        设置当前行
      </n-button>
    </n-space>
    <n-data-table
      ref="tableRef"
      :columns="columns"
      :data="data"
      :max-height="250"
      :checked-row-keys="checkedRowKeysRef"
      @update:checked-row-keys="handleCheck"
    />
  </n-space>
</template>

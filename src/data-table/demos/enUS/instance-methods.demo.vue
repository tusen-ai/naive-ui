<markdown>
# Instance Methods

You can get the table instance via ref to programmatically control filters, sorting, scrolling, selection and expansion.
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
      return `${rowData.name} lives at ${rowData.address}.`
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
    rows.length
      ? `Selected: ${rows.map(r => r.name).join(', ')}`
      : 'No rows selected'
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
        Set Filters
      </n-button>
      <n-button size="small" @click="handleSort">
        Sort
      </n-button>
      <n-button size="small" @click="handleReset">
        Clear Filters & Sorter
      </n-button>
      <n-button size="small" @click="handleScrollTo">
        Scroll To Top
      </n-button>
      <n-button size="small" @click="handleToggleAllSelection">
        Toggle All Selection
      </n-button>
      <n-button size="small" @click="handleClearSelection">
        Clear Selection
      </n-button>
      <n-button size="small" @click="handleToggleRowSelection">
        Toggle Row Selection
      </n-button>
      <n-button size="small" @click="handleToggleRowExpansion">
        Toggle Row Expansion
      </n-button>
      <n-button size="small" @click="handleGetSelectionRows">
        Get Selection Rows
      </n-button>
      <n-button size="small" @click="handleSetCurrentRow">
        Set Current Row
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

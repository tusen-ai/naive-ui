<markdown>
# Selection

Rows can be selectable by making first column's type as `selection`.
</markdown>

<template>
  <n-p>
    You have selected {{ checkedRowKeys.length }} row{{
      checkedRowKeys.length < 2 ? '' : 's'
    }}.
  </n-p>

  <n-data-table
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :row-key="rowKey"
    @update:checked-row-keys="handleCheck"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { DataTableColumns, DataTableRowKey } from 'naive-ui'

type RowData = {
  key: number
  name: string
  age: string
  address: string
}

const createColumns = (): DataTableColumns<RowData> => [
  {
    type: 'selection',
    disabled (row: RowData) {
      return row.name === 'Edward King 3'
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

const data = Array.from({ length: 46 }).map((_, index) => ({
  name: `Edward King ${index}`,
  age: 32,
  address: `London, Park Lane no. ${index}`
}))

export default defineComponent({
  setup () {
    const checkedRowKeysRef = ref<DataTableRowKey[]>([])

    return {
      data,
      columns: createColumns(),
      checkedRowKeys: checkedRowKeysRef,
      pagination: {
        pageSize: 5
      },
      rowKey: (row: RowData) => row.address,
      handleCheck (rowKeys: DataTableRowKey[]) {
        checkedRowKeysRef.value = rowKeys
      }
    }
  }
})
</script>

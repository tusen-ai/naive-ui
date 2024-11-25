<markdown>
# 选中行

可以通过把第一列的类型设为 `selection` 来让行变成可选的。
</markdown>

<script lang="ts">
import type { DataTableColumns, DataTableRowKey } from 'naive-ui'
import { defineComponent, ref } from 'vue'

interface RowData {
  key: number
  name: string
  age: string
  address: string
}

function createColumns(): DataTableColumns<RowData> {
  return [
    {
      type: 'selection',
      disabled(row: RowData) {
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
}

const data = Array.from({ length: 46 }).map((_, index) => ({
  name: `Edward King ${index}`,
  age: 32,
  address: `London, Park Lane no. ${index}`
}))

export default defineComponent({
  setup() {
    const checkedRowKeysRef = ref<DataTableRowKey[]>([])

    return {
      data,
      columns: createColumns(),
      checkedRowKeys: checkedRowKeysRef,
      pagination: {
        pageSize: 5
      },
      rowKey: (row: RowData) => row.address,
      handleCheck(rowKeys: DataTableRowKey[]) {
        checkedRowKeysRef.value = rowKeys
      }
    }
  }
})
</script>

<template>
  <n-p> 你选中了 {{ checkedRowKeys.length }} 行。 </n-p>

  <n-data-table
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :row-key="rowKey"
    @update:checked-row-keys="handleCheck"
  />
</template>

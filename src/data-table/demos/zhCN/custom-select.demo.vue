<markdown>
# 自定义选择项菜单

在 `type='selection'` 的列设定 `options` 来在头部勾选框旁边创建下拉菜单。
</markdown>

<script lang="ts" setup>
import type { DataTableColumns } from 'naive-ui'
import { repeat } from 'seemly'
import { ref } from 'vue'

interface RowData {
  name: string
  age: number
  address: string
  key: number
}

const data = repeat(46, undefined).map<RowData>((_, index) => ({
  name: `Edward King ${index}`,
  age: 32,
  address: `London, Park Lane no. ${index}`,
  key: index
}))

const checkedRowKeysRef = ref<Array<string | number>>([])
const columns: DataTableColumns<RowData> = [
  {
    type: 'selection',
    options: [
      'all',
      'none',
      {
        label: '选中前 2 行',
        key: 'f2',
        onSelect: (pageData) => {
          checkedRowKeysRef.value = pageData.map(row => row.key).slice(0, 2)
        }
      }
    ],
    disabled(row) {
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

const checkedRowKeys = checkedRowKeysRef
const pagination = {
  pageSize: 6
}
</script>

<template>
  <n-p>你选中了 {{ checkedRowKeys.length }} 行。</n-p>
  <n-data-table
    v-model:checked-row-keys="checkedRowKeys"
    :columns="columns"
    :data="data"
    :pagination="pagination"
  />
</template>

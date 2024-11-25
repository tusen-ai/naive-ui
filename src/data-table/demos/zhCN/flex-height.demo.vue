<markdown>
# 弹性高度

如果你想设定表格的整体高度，你可以在设定好表格高度的情况下设定 `flex-height` 属性。
</markdown>

<script lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { defineComponent, h, ref } from 'vue'

interface RowData {
  key: number
  name: string
  age: number
  address: string
  tags: string[]
}

function createColumns(): DataTableColumns<RowData> {
  return [
    {
      type: 'selection',
      fixed: 'left'
    },
    {
      title: 'Name',
      key: 'name',
      width: 200,
      fixed: 'left'
    },
    {
      title: 'Age',
      key: 'age',
      width: 100,
      fixed: 'left'
    },
    {
      title: 'Row',
      key: 'row',
      render(row, index) {
        return h('span', ['row ', index])
      }
    },
    {
      title: 'Row1',
      key: 'row1',
      render(row, index) {
        return h('span', ['row ', index])
      }
    },
    {
      title: 'Row2',
      key: 'row2',
      render(row, index) {
        return h('span', ['row ', index])
      },
      width: 100,
      fixed: 'right'
    },
    {
      title: 'Address',
      key: 'address',
      width: 200,
      fixed: 'right'
    }
  ]
}

export default defineComponent({
  setup() {
    return {
      data: Array.from({ length: 46 }).map((_, index) => ({
        key: index,
        name: `Edward King ${index}`,
        age: 32,
        address: `London, Park Lane no. ${index}`
      })),
      columns: createColumns(),
      pagination: { pageSize: 10 },
      height: ref(200)
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-slider
      v-model:value="height"
      :min="200"
      :max="500"
      :step="100"
      style="max-width: 180px"
    />
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :scroll-x="1800"
      :style="{ height: `${height}px` }"
      flex-height
    />
  </n-space>
</template>

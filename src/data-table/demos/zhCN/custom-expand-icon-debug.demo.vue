<markdown>
# 自定义展开图标
</markdown>

<script lang="ts" setup>
import type { DataTableColumns } from 'naive-ui'
import { ArrowForward } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { h } from 'vue'

interface RowData {
  name: string
  key: string
  children?: RowData[]
}

function createData(): RowData[] {
  return [
    {
      name: 'John Brown',
      key: '1'
    },
    {
      name: 'Jim Green',
      key: '2'
    },
    {
      name: 'Joe Black',
      key: '3'
    }
  ]
}

const columns: DataTableColumns<RowData> = [
  {
    type: 'expand',
    renderExpand: (rowData) => {
      return `${rowData.name} is a good guy.`
    }
  },
  {
    title: '#',
    key: 'key',
    render: (_, index) => {
      return `${index + 1}`
    }
  },
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'index',
    key: 'key'
  }
]

const data = createData()

function renderExpandIcon() {
  return h(NIcon, null, { default: () => h(ArrowForward) })
}
</script>

<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :render-expand-icon="renderExpandIcon"
    default-expand-all
  />
</template>

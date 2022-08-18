<markdown>
# 自定义展开图标
</markdown>

<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :render-expand-icon="renderExpandIcon"
    default-expand-all
  />
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { NIcon } from 'naive-ui'
import { ArrowForward } from '@vicons/ionicons5'

type RowData = {
  name: string
  key: string
  children?: RowData[]
}

const createData = (): RowData[] => [
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

export default defineComponent({
  setup () {
    return {
      data: createData(),
      columns,
      renderExpandIcon: () => {
        return h(NIcon, null, { default: () => h(ArrowForward) })
      }
    }
  }
})
</script>

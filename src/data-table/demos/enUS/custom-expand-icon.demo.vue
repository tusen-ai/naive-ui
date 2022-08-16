<markdown>
# Customize expand icon
</markdown>

<template>
  <n-data-table :columns="columns" :data="data" default-expand-all />
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import type { DataTableColumns } from 'naive-ui'
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
    },
    renderExpandIcon: (expanded) => {
      return h(ArrowForward, {
        style: expanded ? 'transform: rotate(90deg);' : undefined
      })
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
      columns
    }
  }
})
</script>

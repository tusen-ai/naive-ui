<markdown>
# 自定义单元格

日报比小说更玄幻

</markdown>

<template>
  <n-data-table :columns="columns" :data="data" :render-cell="renderCell" />
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import type { DataTableColumns } from 'naive-ui'

type Song = {
  no: number
  note: string
}

const createColumns = (): DataTableColumns<Song> => {
  return [
    {
      title: '日期',
      key: 'no',
      width: 120,
      render: (_, index) => {
        return `星期 ${index + 1}`
      }
    },
    {
      title: '记录',
      key: 'note'
    }
  ]
}

const data: Song[] = [
  { no: 3, note: '' },
  { no: 4, note: '' },
  { no: 12, note: '' },
  { no: 10, note: '' },
  { no: 19, note: '' }
]

export default defineComponent({
  setup () {
    return {
      data,
      columns: createColumns(),
      pagination: false as const,
      renderCell: (value: string | number) => {
        if (!value) {
          return h(
            'span',
            { style: 'color: #ccc;' },
            { default: () => '该怎么编？' }
          )
        }
        return value
      }
    }
  }
})
</script>

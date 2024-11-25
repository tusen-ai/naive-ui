<markdown>
# Customized cell rendering

You may use `render-cell` to customize empty state.
</markdown>

<script lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { NText } from 'naive-ui'
import { defineComponent, h } from 'vue'

interface Song {
  no: number
  note: string
}

function createColumns(): DataTableColumns<Song> {
  return [
    {
      title: 'Date',
      key: 'no',
      width: 120,
      render: (_, index) => {
        return index + 1
      }
    },
    {
      title: 'Note',
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
  setup() {
    return {
      data,
      columns: createColumns(),
      pagination: false as const,
      renderCell: (value: string | number) => {
        if (!value) {
          return h(NText, { depth: 3 }, { default: () => 'Empty' })
        }
        return value
      }
    }
  }
})
</script>

<template>
  <n-data-table :columns="columns" :data="data" :render-cell="renderCell" />
</template>

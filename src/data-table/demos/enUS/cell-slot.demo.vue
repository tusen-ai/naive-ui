<markdown>
# Cell slots

You may use `cell-` slot to customize cell rendering.

Slots are created dynamically based on the `key` field in a columns object.
</markdown>

<script lang="ts" setup>
import type { DataTableColumns } from 'naive-ui'

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
  { no: 3, note: 'Song 1' },
  { no: 4, note: 'Song 2' },
  { no: 12, note: 'Song 3' },
  { no: 10, note: 'Song 4' },
  { no: 19, note: 'Song 5' }
]

const columns = createColumns()
</script>

<template>
  <n-data-table :columns="columns" :data="data">
    <template #cell-note="{ row, column }">
      <!-- Just for example (that you have access to a column description), you may use `row.note` here -->
      <span style="color: purple; font-size: 18px">♪</span>
      {{ row[column.key] }}
    </template>
  </n-data-table>
</template>

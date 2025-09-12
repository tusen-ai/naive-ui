<markdown>
# 单元格插槽

您可以使用 `cell-` 插槽自定义单元格渲染。

插槽是根据 columns 对象中的 `key` 字段动态创建的。
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
      <!-- 仅举例来说（您可以访问列描述），您可以在此处使用`row.note` -->
      <span style="color: purple; font-size: 18px">♪</span>
      {{ row[column.key] }}
    </template>
  </n-data-table>
</template>

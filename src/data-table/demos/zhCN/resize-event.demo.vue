<markdown>
# 列宽拖拽事件

使用 `on-resize-start`、`on-resize` 和 `on-resize-end` 监听列宽拖拽事件。
</markdown>

<script lang="ts" setup>
import type { DataTableBaseColumn, DataTableColumns } from 'naive-ui'
import { NButton, useMessage } from 'naive-ui'
import { h } from 'vue'

interface Song {
  no: number
  title: string
  length: string
}

const message = useMessage()

function handleResizeStart(column: DataTableBaseColumn): void {
  message.info(`开始拖拽列: ${column.title}`)
  console.log('开始拖拽列:', column)
}

function handleResize(column: DataTableBaseColumn, width: number): void {
  console.log('拖拽中:', column, width)
}

function handleResizeEnd(column: DataTableBaseColumn): void {
  console.log('完成拖拽列:', column.title, column)
  message.success(`完成拖拽列: ${column.title}`)
}

function createColumns({
  play
}: {
  play: (row: Song) => void
}): DataTableColumns<Song> {
  return [
    {
      title: 'No',
      key: 'no',
      width: 50
    },
    {
      title: 'Title',
      key: 'title',
      resizable: true
    },
    {
      title: 'Length',
      key: 'length',
      resizable: true,
      minWidth: 100,
      maxWidth: 500
    },
    {
      title: 'Action',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => play(row)
          },
          { default: () => 'Play' }
        )
      }
    }
  ]
}

const data: Song[] = [
  { no: 3, title: 'Wonderwall', length: '4:18' },
  { no: 4, title: 'Don\'t Look Back in Anger', length: '4:48' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' }
]

const columns = createColumns({
  play(row: Song) {
    message.info(`Play ${row.title}`)
  }
})
const pagination = false as const
</script>

<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :bordered="false"
    @resize-start="handleResizeStart"
    @resize="handleResize"
    @resize-end="handleResizeEnd"
  />
</template>

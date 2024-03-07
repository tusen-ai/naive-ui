<markdown>
# Column draggable

Only support leaf nodes.
</markdown>

<script lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { NButton, useMessage } from 'naive-ui'
import { defineComponent, h } from 'vue'

interface Song {
  no: number
  title: string
  band: string
  length: string
}

function createColumns({
  play
}: {
  play: (row: Song) => void
}): DataTableColumns<Song> {
  return [
    {
      type: 'selection',
      fixed: 'left'
    },
    {
      title: 'No',
      key: 'no',
      width: 100,
      fixed: 'left',
      resizable: true
    },
    {
      title: 'Title',
      key: 'title',
      width: 200,
      fixed: 'left',
      resizable: true
    },
    {
      title: 'Length (minWidth: 100, maxWidth: 500)',
      key: 'length'
    },
    {
      title: 'Band',
      key: 'band',
      width: 100,
      fixed: 'right',
      resizable: true
    },
    {
      title: 'Action',
      key: 'actions',
      fixed: 'right',
      width: 100,
      resizable: true,
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

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      data,
      columns: createColumns({
        play(row: Song) {
          message.info(`Play ${row.title}`)
        }
      }),
      pagination: false as const
    }
  }
})
</script>

<template>
  <n-data-table
    :row-key="(row) => row.no"
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :bordered="false"
    :scroll-x="1800"
  />
</template>

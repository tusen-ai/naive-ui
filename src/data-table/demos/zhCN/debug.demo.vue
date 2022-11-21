<markdown>
# Debug
</markdown>

<template>
  <n-switch v-model:value="loading">
    <template #checked>
      Loading
    </template>
    <template #unchecked>
      Not loading
    </template>
  </n-switch>
  <n-data-table
    :loading="loading"
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :bordered="false"
  />
</template>

<script lang="ts">
import { h, defineComponent, ref } from 'vue'
import { NButton, useMessage, PaginationProps } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

type Song = {
  no: number
  title: string
  length: string
}

const createColumns = ({
  play
}: {
  play: (row: Song) => void
}): DataTableColumns<Song> => {
  return [
    {
      title: 'No',
      key: 'no'
    },
    {
      title: 'Title',
      key: 'title',
      align: 'right'
    },
    {
      title: 'Length',
      key: 'length',
      align: 'center'
    },
    {
      title: 'Action',
      key: 'actions',
      render (row) {
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
  { no: 4, title: "Don't Look Back in Anger", length: '4:48' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' }
]

export default defineComponent({
  setup () {
    const message = useMessage()
    const pagination: PaginationProps = {
      prefix: ({ startIndex, endIndex }) => {
        return ['startIndex', startIndex, 'endIndex', endIndex]
      }
    }
    return {
      data,
      columns: createColumns({
        play (row: Song) {
          message.info(`Play ${row.title}`)
        }
      }),
      loading: ref(false),
      pagination
    }
  }
})
</script>

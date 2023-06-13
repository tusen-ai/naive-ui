<markdown>
  # Export Csv
  </markdown>

<template>
  <n-space vertical :size="12">
    <n-button @click="exportCsv">
      Export Csv
    </n-button>
    <n-data-table
      ref="tableRef"
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :bordered="false"
    />
  </n-space>
</template>

<script lang="ts">
import { h, defineComponent, ref } from 'vue'
import { DataTableInst, NButton, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

type Song = {
  key: number
  name: string
  age: number
  address: string
}

const createColumns = ({
  play
}: {
  play: (row: Song) => void
}): DataTableColumns<Song> => {
  return [
    {
      title: 'Name',
      key: 'name',
      sorter: 'default'
    },
    {
      title: 'Age',
      key: 'age',
      sorter: (row1, row2) => row1.age - row2.age
    },
    {
      title: 'Address',
      key: 'address'
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
  {
    key: 0,
    name: 'John Brown',
    age: 18,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 28,
    address: 'London No. 1 Lake Park'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 38,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: 3,
    name: 'Jim Red',
    age: 48,
    address: 'London No. 2 Lake Park'
  }
]

export default defineComponent({
  setup () {
    const message = useMessage()
    const tableRef = ref<DataTableInst>()

    const exportCsv = () =>
      tableRef.value?.exportCsv({ fileName: 'data-table' })

    return {
      data,
      tableRef,
      exportCsv,
      columns: createColumns({
        play (row: Song) {
          message.info(`Play ${row.name}`)
        }
      }),
      pagination: false as const
    }
  }
})
</script>

<markdown>
# Expand rows

Note that: Expanded rows are not included in the `index` of `render`.
</markdown>

<script lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { NButton, NTag, useMessage } from 'naive-ui'
import { defineComponent, h } from 'vue'

interface RowData {
  key: number
  name: string
  age: number
  address: string
  tags: string[]
}

function createColumns({
  sendMail
}: {
  sendMail: (rowData: RowData) => void
}): DataTableColumns<RowData> {
  return [
    {
      type: 'selection'
    },
    {
      type: 'expand',
      expandable: rowData => rowData.name !== 'Jim Green',
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
      title: 'Age',
      key: 'age'
    },
    {
      title: 'Address',
      key: 'address'
    },
    {
      title: 'Tags',
      key: 'tags',
      render(row) {
        const tags = row.tags.map((tagKey) => {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px'
              },
              type: 'info',
              bordered: false
            },
            {
              default: () => tagKey
            }
          )
        })
        return tags
      }
    },
    {
      title: 'Action',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            size: 'small',
            onClick: () => sendMail(row)
          },
          { default: () => 'Send Email' }
        )
      }
    }
  ]
}

function createData(): RowData[] {
  return [
    {
      key: 0,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },
    {
      key: 1,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['wow']
    },
    {
      key: 2,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    }
  ]
}

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      data: createData(),
      columns: createColumns({
        sendMail(rowData) {
          message.info(`send mail to ${rowData.name}`)
        }
      }),
      pagination: {
        pageSize: 10
      }
    }
  }
})
</script>

<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :pagination="pagination"
    default-expand-all
  />
</template>

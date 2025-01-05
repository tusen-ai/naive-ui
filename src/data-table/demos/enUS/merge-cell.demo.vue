<markdown>
# Merge cell

Set colspan and rowspan by setting `colSpan` and `rowSpan` of column object. Set colspan in header by setting `titleColSpan` of column object.
</markdown>

<script lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { NButton, NTag, useMessage } from 'naive-ui'
import { defineComponent, h } from 'vue'

interface RawData {
  key: number
  name: string
  age: number
  address: string
  tags: string[]
}

interface SendMail {
  (rowData: RawData): void
}

function createColumns({
  sendMail
}: {
  sendMail: SendMail
}): DataTableColumns<RawData> {
  return [
    {
      title: 'Name',
      titleColSpan: 2,
      key: 'name',
      rowSpan: (rowData, rowIndex) => (rowIndex === 0 ? 2 : 1),
      colSpan: (rowData, rowIndex) => (rowIndex === 0 ? 2 : 1)
    },
    {
      title: 'Age',
      key: 'age'
    },
    {
      title: 'Address',
      key: 'address',
      colSpan: (rowData, rowIndex) => (rowIndex === 2 ? 2 : 1)
    },
    {
      title: 'Tags',
      key: 'tags',
      titleColSpan: 2,
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
      rowSpan: (rowData, rowIndex) => (rowIndex === 0 ? 2 : 1),
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

function createData(): RawData[] {
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
    function sendMail(rowData: RawData) {
      message.info(`send mail to ${rowData.name}`)
    }
    return {
      data: createData(),
      columns: createColumns({ sendMail }),
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
    :single-line="false"
  />
</template>

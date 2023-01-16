<markdown>
  # Summary debug
</markdown>

<template>
  <n-data-table :columns="columns" :data="data" :summary="summary" />
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'

const createColumns = () => {
  return [
    {
      title: 'parehnt',
      children: [
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Name',
          key: 'name',
          fixed: 'left'
        }
      ]
    },
    {
      title: 'Address',
      key: 'address'
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ] as any
}

const createData = () => [
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }
]

const createSummary = () => {
  return [
    {
      name: {
        value: h('span', { style: { color: 'red' } }, '7'),
        colSpan: 2,
        rowSpan: 1
      },
      age: {
        value: h('span', null, '6')
      }
    }
  ]
}

export default defineComponent({
  setup () {
    return {
      summary: createSummary,
      data: createData(),
      columns: createColumns()
    }
  }
})
</script>

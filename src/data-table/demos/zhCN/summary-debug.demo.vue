<markdown>
  # Summary debug
</markdown>

<script lang="ts">
import { defineComponent, h } from 'vue'

function createColumns() {
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
  ] as any
}

function createData() {
  return [
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
}

function createSummary() {
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
  setup() {
    return {
      summary: createSummary,
      data: createData(),
      columns: createColumns()
    }
  }
})
</script>

<template>
  <n-data-table :columns="columns" :data="data" :summary="summary" />
</template>

<markdown>
  # Summary debug
</markdown>

<script lang="ts" setup>
import { h } from 'vue'

function createColumns() {
  return [
    {
      title: 'Age',
      key: 'age',
      width: 500
    },
    {
      title: 'Name',
      key: 'name',
      width: 500
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
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: 3,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: 4,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: 5,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: 6,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: 61,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: 7,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: 8,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: 9,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: 10,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: 11,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: 12,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: 13,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: 14,
      name: 'Joe Black',
      age: 132,
      address: 'Sidney No. 1 Lake Park'
    }
  ]
}

function createSummary() {
  return [
    {
      name: {
        value: h('span', { style: { color: 'red' } }, '7'),
        colSpan: 1,
        rowSpan: 1
      },
      age: {
        value: h('span', null, '6')
      }
    }
  ]
}

const summary = createSummary
const data = createData()
const columns = createColumns()
</script>

<template>
  <n-data-table
    virtual-scroll
    :max-height="300"
    summary-placement="bottom"
    :summary-sticky="true"
    :scroll-x="1200"
    :scrollbar-props="{ trigger: 'none', size: 12 }"
    :columns="columns"
    :data="data"
    :summary="summary"
  />
</template>

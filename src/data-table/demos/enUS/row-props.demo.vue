<markdown>
# Custom row props

If you want to add attr or event handlers to a row, use `row-props` prop.
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'

interface RowData {
  key: number
  name: string
  age: string
  address: string
}

const message = useMessage()

function rowProps(row: RowData) {
  return {
    style: 'cursor: pointer;',
    onClick: () => {
      message.info(row.name)
    }
  }
}

const columns = [
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
  }
]

const data = [
  {
    key: 0,
    name: '07akioni',
    age: '18',
    address: 'Yiheyuan Road'
  },
  {
    key: 1,
    name: '08akioni',
    age: '14',
    address: 'Pingshan Road'
  },
  {
    key: 2,
    name: '09akioni',
    age: '22',
    address: 'Haidian Bridge'
  }
]
</script>

<template>
  <n-data-table :columns="columns" :data="data" :row-props="rowProps" />
</template>

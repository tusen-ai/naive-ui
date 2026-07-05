<markdown>
# 空表格
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

function createColumns() {
  return [
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
      key: 'tags'
    },
    {
      title: 'Action',
      key: 'actions'
    }
  ]
}

const data = ref([])
const columns = createColumns()
</script>

<template>
  <n-data-table :columns="columns" :data="data" />
</template>

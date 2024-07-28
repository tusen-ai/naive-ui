<markdown>
# Empty
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

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

export default defineComponent({
  setup() {
    return {
      data: ref([]),
      columns: createColumns()
    }
  }
})
</script>

<template>
  <n-data-table :columns="columns" :data="data" />
</template>

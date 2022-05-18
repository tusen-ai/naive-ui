<markdown>
# Fixed header

Display large amounts of data in scrollable view by set `max-height`.
</markdown>

<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :max-height="250"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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

export default defineComponent({
  data () {
    return {
      data: Array.from({ length: 46 }).map((_, index) => ({
        key: index,
        name: `Edward King ${index}`,
        age: 32,
        address: `London, Park Lane no. ${index}`
      })),
      columns,
      pagination: {
        pageSize: 15
      }
    }
  }
})
</script>

<markdown>
# Custom page size options
</markdown>

<template>
  <n-pagination
    v-model:page="page"
    v-model:page-size="pageSize"
    :page-count="100"
    show-size-picker
    :page-sizes="pageSizes"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const pageSizes = [
      {
        label: '10 per page',
        value: 10
      },
      {
        label: '20 per page',
        value: 20
      },
      {
        label: '30 per page',
        value: 30
      },
      {
        label: '40 per page',
        value: 40
      }
    ]
    return {
      page: ref(2),
      pageSize: ref(20),
      pageSizes
    }
  }
})
</script>

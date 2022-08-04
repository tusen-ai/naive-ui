<markdown>
# 自定义 PageSizes 选项
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
        label: '10 每页',
        value: 10
      },
      {
        label: '20 每页',
        value: 20
      },
      {
        label: '30 每页',
        value: 30
      },
      {
        label: '40 每页',
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

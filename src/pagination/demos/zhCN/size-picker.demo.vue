<markdown>
# 每页条数
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      page: ref(2),
      pageSize: ref(20)
    }
  }
})
</script>

<template>
  <n-pagination
    v-model:page="page"
    v-model:page-size="pageSize"
    :page-count="100"
    show-size-picker
    :page-sizes="[10, 20, 30, 40]"
  />
</template>

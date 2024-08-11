<markdown>
# 简单分页
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      page: ref(2)
    }
  }
})
</script>

<template>
  <n-pagination v-model:page="page" :page-count="100" simple />
</template>

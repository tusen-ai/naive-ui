<markdown>
# Basic
</markdown>

<template>
  <n-pagination :page="1" :page-count="100" />
  <n-space>
    <n-pagination v-model:page="page2" :page-count="pageCount" />
    <n-button size="small" @click="pageCount += 10">
      change pageCount
    </n-button>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      page: ref(2),
      page2: ref(1),
      pageCount: ref(0)
    }
  }
})
</script>

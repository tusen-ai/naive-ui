<markdown>
# 基础用法
</markdown>

<template>
  <n-space vertical>
    <n-pagination :page="page" :page-count="100" />
    <n-space>
      <n-pagination v-model:page="page2" :page-count="pageCount" />
      <n-button size="small" @click="pageCount += 10">
        pageCount 走你
      </n-button>
    </n-space>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      page: ref(1),
      page2: ref(1),
      pageCount: ref(0)
    }
  }
})
</script>

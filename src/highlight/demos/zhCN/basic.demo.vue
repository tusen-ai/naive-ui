<markdown>
  # 基础
</markdown>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      text: 'Naive UI 是一个 Vue3 的组件库，它比较完整，主题可调，用 TypeScript 写的，快。',
      patterns: ['Naive UI', 'Vue3', 'TypeScript', '快']
    }
  }
})
</script>

<template>
  <n-highlight :text="text" :patterns="patterns" />
</template>

<markdown>
# 高亮标签

通过 `component` 属性可以指定高亮文本的标签。

</markdown>

<template>
  <n-highlight
    :text="text"
    component="H4"
    :words="words"
    :highlight-style="{
      display: 'inline-block',
      margin: '4px',
      padding: '4px',
      'border-radius': '6px',
      background: '#18a058',
      color: 'white'
    }"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup () {
    return {
      text: 'Naive UI 是一个 Vue3 的组件库，它比较完整，主题可调，用 TypeScript 写的，快。',
      words: ['Naive UI', 'Vue3', 'TypeScript', '快']
    }
  }
})
</script>

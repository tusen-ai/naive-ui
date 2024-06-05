<markdown>
# 区分大小写

默认情况下，高亮是不区分大小写，你可以通过 `case-sensitive` 属性来开启区分大小写模式。
</markdown>

<template>
  <n-highlight
    :text="text"
    :words="words"
    :case-sensitive="true"
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
      text: 'Naive UI 全量使用 TypeScript 编写，和你的 TypeScript 项目无缝衔接',
      words: ['Naive UI', 'typeScript']
    }
  }
})
</script>

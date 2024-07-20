<markdown>
  # 样式

  换个样式，让高亮更加醒目。
</markdown>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      text: 'Naive UI 全量使用 TypeScript 编写，和你的 TypeScript 项目无缝衔接',
      words: ['Naive UI', 'TypeScript']
    }
  }
})
</script>

<template>
  <n-flex vertical>
    <n-highlight
      :text="text"
      :words="words"
      :highlight-style="{
        'display': 'inline-block',
        'margin': '4px',
        'padding': '4px',
        'border-radius': '6px',
        'background': '#18a058',
        'color': 'white',
      }"
    />
    <n-highlight
      :text="text"
      :words="words"
      :highlight-style="{
        'display': 'inline-block',
        'margin': '4px',
        'padding': '4px 12px',
        'border-radius': '30px',
        'background': '#409EFF',
        'color': 'white',
      }"
    />
  </n-flex>
</template>

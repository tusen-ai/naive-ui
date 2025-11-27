<markdown>
# 使用 Shiki

使用 `shiki` 来高亮代码。
</markdown>

<script lang="ts">
import { createHighlighter } from 'shiki'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  setup() {
    const shikiRef = ref<any>(null)
    const log = `console.log('Hello Shiki')
const a = 1
const b = 2
console.log(a + b)`

    onMounted(async () => {
      const highlighter = await createHighlighter({
        themes: ['nord'],
        langs: ['javascript']
      })
      shikiRef.value = {
        codeToHtml: (code: string, options: any) => {
          return highlighter.codeToHtml(code, { ...options, theme: 'nord' })
        }
      }
    })

    return {
      shiki: shikiRef,
      log
    }
  }
})
</script>

<template>
  <n-log :shiki="shiki" :log="log" language="javascript" />
</template>

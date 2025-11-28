<markdown>
# 使用 Shiki

使用 `shiki` 来高亮代码。
</markdown>

<script lang="ts" setup>
import { createHighlighter } from 'shiki'
import { onMounted, ref } from 'vue'

const shiki = ref()
const code = `function sayHello() {
  console.log('Hello Shiki')
}`

onMounted(async () => {
  const highlighter = await createHighlighter({
    themes: ['nord'],
    langs: ['javascript']
  })

  shiki.value = {
    codeToHtml(code: string) {
      return highlighter.codeToHtml(code, {
        lang: 'javascript',
        theme: 'nord'
      })
    }
  }
})
</script>

<template>
  <n-code :shiki="shiki" :code="code" language="javascript" show-line-numbers />
</template>

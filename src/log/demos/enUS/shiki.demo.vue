<markdown>
# Use Shiki

Use `shiki` to define a custom `naive-shiki-log` language so that `n-log` can highlight numbers and log levels.
</markdown>

<script lang="ts" setup>
import type { LanguageInput } from 'shiki'
import { createHighlighter } from 'shiki'
import { onMounted, ref } from 'vue'

const shiki = ref()
const log = `[2024-05-01 09:15:11] INFO  Booting worker #42
[2024-05-01 09:17:02] WARN  Queue latency is 87ms
[2024-05-01 09:18:44] ERROR Failed to connect (code: 503)`

const naiveLogLanguage: LanguageInput = {
  name: 'naive-shiki-log',
  scopeName: 'source.naive-shiki-log',
  patterns: [
    {
      name: 'constant.numeric.naive-shiki-log',
      match: '\\b\\d+(?:\\.\\d+)?\\b'
    },
    {
      name: 'keyword.operator.naive-shiki-log',
      match: '\\b(INFO|WARN|ERROR|DEBUG)\\b'
    },
    {
      begin: '\\[',
      end: '\\]',
      name: 'punctuation.definition.bracket.naive-shiki-log'
    }
  ],
  repository: {}
}

onMounted(async () => {
  const highlighter = await createHighlighter({
    themes: ['vitesse-light'],
    langs: [naiveLogLanguage]
  })

  shiki.value = {
    codeToHtml(code: string) {
      return highlighter.codeToHtml(code, {
        lang: 'naive-shiki-log',
        theme: 'vitesse-light'
      })
    }
  }
})
</script>

<template>
  <n-log :shiki="shiki" :log="log" language="naive-shiki-log" trim />
</template>

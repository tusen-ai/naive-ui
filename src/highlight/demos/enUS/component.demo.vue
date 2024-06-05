<markdown>
# Highlight Tag

The `component` property allows you to specify tag for highlighted text.
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
      text: 'Naive UI is a Vue3 component library, it is relatively complete, tunable themes, written in TypeScript, fast.',
      words: ['Naive UI', 'Vue3', 'TypeScript', 'fast']
    }
  }
})
</script>

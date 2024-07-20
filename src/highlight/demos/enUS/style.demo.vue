<markdown>
# Style

Change the style to make the highlight more striking.
</markdown>

<template>
  <n-flex vertical>
    <n-highlight
      :text="text"
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
    <n-highlight
      :text="text"
      :words="words"
      :highlight-style="{
        display: 'inline-block',
        margin: '4px',
        padding: '4px 12px',
        'border-radius': '30px',
        background: '#409EFF',
        color: 'white'
      }"
    />
  </n-flex>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup () {
    return {
      text: 'Naive UI is written in full TypeScript and works seamlessly with your TypeScript projects',
      words: ['Naive UI', 'typeScript']
    }
  }
})
</script>

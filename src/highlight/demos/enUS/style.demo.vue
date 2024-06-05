<markdown>
# Style

Change the style to make the highlight more striking.
</markdown>

<template>
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

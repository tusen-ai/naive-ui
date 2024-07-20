<markdown>
# Case sensitive

By default, highlighting is case-sensitive, which you can turn on using the `case-sensitive` property.
</markdown>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      text: 'Naive UI is written in full TypeScript and works seamlessly with your TypeScript projects',
      words: ['Naive UI', 'typeScript']
    }
  }
})
</script>

<template>
  <n-highlight
    :text="text"
    :words="words"
    :case-sensitive="true"
    :highlight-style="{
      'display': 'inline-block',
      'margin': '4px',
      'padding': '4px',
      'border-radius': '6px',
      'background': '#18a058',
      'color': 'white',
    }"
  />
</template>

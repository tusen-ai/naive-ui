<markdown>
# Highlight Tag

The `highlight-tag` property allows you to specify tag for highlighted text.
</markdown>

<script lang="ts" setup>
const text
  = 'Naive UI is a Vue3 component library, it is relatively complete, tunable themes, written in TypeScript, fast.'
const patterns = ['Naive UI', 'Vue3', 'TypeScript', 'fast']
</script>

<template>
  <n-highlight
    :text="text"
    highlight-tag="span"
    :patterns="patterns"
    highlight-style="text-decoration: underline"
  />
</template>

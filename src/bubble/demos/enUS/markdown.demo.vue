<markdown>
# Markdown render

Refer to the NMarkdown component
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'
import 'vue-markdown-unified/dist/themes/prism.min.css'

const content = ref(`# This is an H1
## This is an H2
### This is an H3
#### This is an H4
##### This is an H5`)
</script>

<template>
  <n-bubble :content="content" is-markdown />
</template>

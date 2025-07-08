<markdown>
# Gitgraph Diagrams
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(`gitGraph
   commit
   commit
   branch develop
   checkout develop
   commit
   commit
   checkout main
   merge develop
   commit
   commit
`)
</script>

<template>
  <n-mermaid v-model:value="value" />
</template>

<markdown>
# 看板图
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(`kanban
  column1[Column Title]
    task1[Task Description]
`)
</script>

<template>
  <n-mermaid v-model:value="value" />
</template>

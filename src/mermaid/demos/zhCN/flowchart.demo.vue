<markdown>
# 流程图
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(`flowchart LR
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]
`)
</script>

<template>
  <n-mermaid v-model:value="value" />
</template>

<markdown>
# 序列图
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(`sequenceDiagram
    autonumber
    Alice->>John: Hello John, how are you?
    loop HealthCheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
`)
</script>

<template>
  <n-mermaid v-model:value="value" />
</template>

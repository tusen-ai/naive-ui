<markdown>
# 状态图
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(`stateDiagram-v2
    [*] --> Still
    Still --> [*]

    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
`)
</script>

<template>
  <n-mermaid v-model:value="value" />
</template>

<markdown>
# 加载
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

function log() {
  const l: string[] = []
  for (let i = 0; i < 40; ++i) {
    l.push(Math.random().toString(16))
  }
  return `${l.join('\n')}\n`
}

const loading = ref(false)
const logRef = ref(log())
</script>

<template>
  <n-switch v-model:value="loading" />
  <n-log :loading="loading" :log="logRef" />
</template>

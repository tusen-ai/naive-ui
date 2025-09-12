<markdown>
# 操作
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const ts1 = ref(null)
const ts2 = ref(861333934000)
</script>

<template>
  <n-space vertical>
    <n-time-picker v-model:value="ts1" :actions="['now', 'clear']" />
    <n-time-picker v-model:value="ts2" :actions="null" />
  </n-space>
</template>

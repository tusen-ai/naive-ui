<markdown>
# 尺寸

可以是 `small`、`medium` 或 `large` 尺寸。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const timestamp = ref(null)
</script>

<template>
  <n-space vertical>
    <n-time-picker v-model:value="timestamp" size="small" />
    <n-time-picker v-model:value="timestamp" size="medium" />
    <n-time-picker v-model:value="timestamp" size="large" />
  </n-space>
</template>

<markdown>
# 键盘事件
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(50)
const keyboard = ref(false)
</script>

<template>
  <n-space vertical>
    <n-switch v-model:value="keyboard" />
    <n-slider v-model:value="value" :step="10" :keyboard="keyboard" />
    <n-input-number v-model:value="value" size="small" />
  </n-space>
</template>

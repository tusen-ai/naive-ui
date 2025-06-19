<markdown>
# Disabled
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(0)
const disabled = ref(true)
</script>

<template>
  <n-space align="center">
    <n-switch v-model:value="disabled" />
    <n-input-number v-model:value="value" :disabled="disabled" />
  </n-space>
</template>

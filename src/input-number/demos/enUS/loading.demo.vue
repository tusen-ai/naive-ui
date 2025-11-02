<markdown>
# Loading
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
  <n-space align="center">
    <n-input-number clearable :loading="loading" />
    <n-switch v-model:value="loading" />
  </n-space>
</template>

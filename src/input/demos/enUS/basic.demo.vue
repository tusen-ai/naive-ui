<markdown>
# Basic

Basic use of `n-input`.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(null)
</script>

<template>
  <n-space vertical>
    <n-input v-model:value="value" type="text" placeholder="Basic Input" />
    <n-input
      v-model:value="value"
      type="textarea"
      placeholder="Basic Textarea"
    />
  </n-space>
</template>

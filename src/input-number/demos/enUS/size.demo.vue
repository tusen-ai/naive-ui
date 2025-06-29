<markdown>
# Size
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(0)
</script>

<template>
  <n-space vertical>
    <n-input-number v-model:value="value" size="tiny" />
    <n-input-number v-model:value="value" size="small" />
    <n-input-number v-model:value="value" size="medium" />
    <n-input-number v-model:value="value" size="large" />
  </n-space>
</template>

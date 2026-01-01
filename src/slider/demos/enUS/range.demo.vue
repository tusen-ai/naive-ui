<markdown>
# Range
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([50, 70])
</script>

<template>
  <n-space vertical>
    <n-slider v-model:value="value" range :step="1" />
    <n-space>
      <n-input-number v-model:value="value[0]" size="small" />
      <n-input-number v-model:value="value[1]" size="small" />
    </n-space>
  </n-space>
</template>

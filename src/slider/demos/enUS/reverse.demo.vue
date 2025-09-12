<markdown>
# Reverse

Set `reverse` to invert the track.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(0)
</script>

<template>
  <n-space vertical>
    <n-slider v-model:value="value" :step="10" reverse />
    <n-input-number v-model:value="value" size="small" />
  </n-space>
</template>

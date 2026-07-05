<markdown>
# Offset
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(5)
const offset = [-17, 17] as const
</script>

<template>
  <n-badge :value="value" :max="15" :offset="offset">
    <n-avatar />
  </n-badge>
</template>

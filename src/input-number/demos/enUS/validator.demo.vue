<markdown>
# Validator
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(0)
const validator = (x: number) => x > 0
</script>

<template>
  <n-input-number v-model:value="value" :validator="validator" />
</template>

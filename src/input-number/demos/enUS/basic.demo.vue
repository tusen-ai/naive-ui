<markdown>
# Basic
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(0)
</script>

<template>
  <n-input-number v-model:value="value" clearable />
</template>

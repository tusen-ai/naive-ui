<markdown>
# Show sort button
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(['', '', ''])
</script>

<template>
  <n-dynamic-input
    v-model:value="value"
    placeholder="Come on"
    show-sort-button
  />
  <pre>{{ JSON.stringify(value, null, 2) }}</pre>
</template>

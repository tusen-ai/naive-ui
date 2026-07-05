<markdown>
# Using pair preset
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([
  {
    key: '',
    value: ''
  }
])
</script>

<template>
  <n-dynamic-input
    v-model:value="value"
    preset="pair"
    key-placeholder="Please input the key"
    value-placeholder="Please input the value"
  />
  <pre>{{ JSON.stringify(value, null, 2) }}</pre>
</template>

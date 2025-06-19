<markdown>
# Use input preset

By default, the preset element of `n-dynamic-input` is `input`.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(['', '', ''])
</script>

<template>
  <n-dynamic-input
    v-model:value="value"
    placeholder="Please type here"
    :min="3"
    :max="6"
  />
  <pre>{{ JSON.stringify(value, null, 2) }}</pre>
</template>

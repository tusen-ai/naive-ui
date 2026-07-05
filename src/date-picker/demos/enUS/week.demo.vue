<markdown>
# Week
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const timestamp = ref(1183135260000)
</script>

<template>
  <n-date-picker v-model:value="timestamp" type="week" clearable />
  <pre>{{ JSON.stringify(timestamp) }}</pre>
</template>

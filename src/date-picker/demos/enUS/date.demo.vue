<markdown>
# Date
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const timestamp = ref(1183135260000)
</script>

<template>
  <n-date-picker v-model:value="timestamp" type="date" />
  <pre>{{ JSON.stringify(timestamp) }}</pre>
</template>

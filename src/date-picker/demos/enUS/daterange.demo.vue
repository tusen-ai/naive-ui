<markdown>
# Date range
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const range = ref<[number, number]>([1183135260000, Date.now()])
</script>

<template>
  <n-date-picker v-model:value="range" type="daterange" clearable />
  <pre>{{ JSON.stringify(range) }}</pre>
</template>

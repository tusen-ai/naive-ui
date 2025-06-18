<markdown>
# 年份
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const timestamp = ref(1183135260000)
</script>

<template>
  <n-date-picker v-model:value="timestamp" type="year" clearable />
  <pre>{{ JSON.stringify(timestamp) }}</pre>
</template>

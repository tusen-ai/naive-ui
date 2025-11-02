<markdown>
# 年份范围
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const timestamp = ref<[number, number]>([1183135260000, Date.now()])
</script>

<template>
  <n-date-picker v-model:value="timestamp" type="yearrange" clearable />
  <pre>{{ JSON.stringify(timestamp) }}</pre>
</template>

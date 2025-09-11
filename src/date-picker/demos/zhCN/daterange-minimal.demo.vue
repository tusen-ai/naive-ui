<markdown>
# 日期范围（单日历）
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const range = ref<[number, number] | null>(null)
</script>

<template>
  <n-date-picker v-model:value="range" type="daterange-minimal" clearable />
  <pre>{{ JSON.stringify(range) }}</pre>
</template>

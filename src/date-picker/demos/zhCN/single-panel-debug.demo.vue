<markdown>
# 单面板 日期范围 Debug

仅daterange，datetimerange 待完善UI
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const range = ref<[number, number]>([Date.now(), Date.now()])
</script>

<template>
  <n-date-picker
    v-model:value="range"
    type="daterange"
    single-panel
    clearable
  />
  <n-date-picker
    v-model:value="range"
    type="daterange"
    panel
    single-panel
    clearable
  />
  <pre>{{ JSON.stringify(range) }}</pre>
</template>

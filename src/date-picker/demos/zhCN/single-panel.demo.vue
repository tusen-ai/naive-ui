<markdown>
# 单面板

type为daterange时有效
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

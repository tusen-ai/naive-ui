<markdown>
# Built-in Themes

Use the `color-theme` prop to apply built-in color themes. Available themes: `github` (default), `green`, `blue`, `orange`, `purple`, `red`.
</markdown>

<script setup lang="ts">
import { heatmapMockData } from 'naive-ui'
import { ref } from 'vue'

const data = ref(heatmapMockData())

const themes = [
  { name: 'GitHub (Default)', value: 'github' },
  { name: 'Green', value: 'green' },
  { name: 'Blue', value: 'blue' },
  { name: 'Orange', value: 'orange' },
  { name: 'Purple', value: 'purple' },
  { name: 'Red', value: 'red' }
] as const
</script>

<template>
  <n-flex vertical size="large">
    <div v-for="theme in themes" :key="theme.value">
      <n-divider title-placement="left">
        {{ theme.name }}
      </n-divider>
      <n-heatmap :data="data" unit="commits" :color-theme="theme.value" />
    </div>
  </n-flex>
</template>

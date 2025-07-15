<markdown>
# 内置主题

使用 `color-theme` 属性应用内置的颜色主题。可用主题：`github`（默认）、`green`、`blue`、`orange`、`purple`、`red`。
</markdown>

<script setup lang="ts">
import { heatmapMockData } from 'naive-ui'

const data = heatmapMockData()

const themes = [
  { name: 'GitHub（默认）', value: 'github' },
  { name: '绿色', value: 'green' },
  { name: '蓝色', value: 'blue' },
  { name: '橙色', value: 'orange' },
  { name: '紫色', value: 'purple' },
  { name: '红色', value: 'red' }
] as const
</script>

<template>
  <n-flex vertical size="large">
    <div v-for="theme in themes" :key="theme.value">
      <n-divider title-placement="left">
        {{ theme.name }}
      </n-divider>
      <n-heatmap :data="data" :color-theme="theme.value" />
    </div>
  </n-flex>
</template>

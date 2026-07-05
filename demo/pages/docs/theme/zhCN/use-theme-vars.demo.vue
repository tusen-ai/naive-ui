<markdown>
# useThemeVars

Naive UI 提供 `useThemeVars`，它包含了常见的主题变量。
</markdown>

<script setup lang="ts">
import { useThemeVars } from 'naive-ui'

const themeVars = useThemeVars()
</script>

<template>
  <pre style="overflow: auto">{{ themeVars }}</pre>
</template>

<markdown>
# 使用操作系统主题

Naive UI 提供 `useOsTheme` 来获取当前操作系统的主题。
</markdown>

<script lang="ts" setup>
import { darkTheme, useOsTheme } from 'naive-ui'
import { computed } from 'vue'

const osTheme = useOsTheme()
const theme = computed(() => (osTheme.value === 'dark' ? darkTheme : null))
</script>

<template>
  <n-config-provider :theme="theme">
    <n-card> 当前操作系统的主题是 {{ osTheme }}。 </n-card>
  </n-config-provider>
</template>

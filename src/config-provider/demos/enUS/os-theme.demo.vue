<markdown>
# Use OS theme

Naive UI provides `useOsTheme` to get the current theme of your OS.
</markdown>

<script lang="ts" setup>
import { darkTheme, useOsTheme } from 'naive-ui'
import { computed } from 'vue'

const osTheme = useOsTheme()
const theme = computed(() => (osTheme.value === 'dark' ? darkTheme : null))
</script>

<template>
  <n-config-provider :theme="theme">
    <n-card> Your current system theme is {{ osTheme }}. </n-card>
  </n-config-provider>
</template>

<markdown>
# Hover Value

Listen to hover value changes via `on-update:hover-value`.
</markdown>

<script setup lang="ts">
import { useMessage } from 'naive-ui'

const message = useMessage()
function handleUpdateHoverValue(value: number | null): void {
  message.info(`Hover value: ${value}`)
}
</script>

<template>
  <n-rate allow-half @update:hover-value="handleUpdateHoverValue" />
</template>

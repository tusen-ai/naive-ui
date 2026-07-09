<markdown>
# Hover Change

Listen to hover index changes via `on-hover-change`.
</markdown>

<script setup lang="ts">
import { useMessage } from 'naive-ui'

const message = useMessage()
function handleHoverChange(value: number | null): void {
  message.info(`Hover index: ${value}`)
}
</script>

<template>
  <n-rate allow-half @hover-change="handleHoverChange" />
</template>

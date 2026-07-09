<markdown>
# 监听悬浮变化

通过 `on-hover-change` 监听悬浮图标个数的变化。
</markdown>

<script setup lang="ts">
import { useMessage } from 'naive-ui'

const message = useMessage()
function handleHoverChange(value: number | null): void {
  message.info(`悬浮图标个数：${value}`)
}
</script>

<template>
  <n-rate allow-half @hover-change="handleHoverChange" />
</template>

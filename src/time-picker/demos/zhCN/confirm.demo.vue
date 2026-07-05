<markdown>
# 确认
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'

const message = useMessage()
function handleConfirm(value: number | null) {
  message.success(`确认${value}`)
}
</script>

<template>
  <n-space>
    <n-time-picker
      default-formatted-value="00:12:13"
      @confirm="handleConfirm"
    />
  </n-space>
</template>

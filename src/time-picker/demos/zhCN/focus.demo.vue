<markdown>
# 手动 focus & blur
</markdown>

<script lang="ts" setup>
import type { TimePickerInst } from 'naive-ui'
import { ref } from 'vue'

const timePickerInstRef = ref<TimePickerInst | null>(null)

function handleClick() {
  timePickerInstRef.value?.focus()
  setTimeout(() => {
    timePickerInstRef.value?.blur()
  }, 1000)
}
</script>

<template>
  <n-space item-style="display: flex; align-item: center;">
    <n-button @click="handleClick">
      聚焦，一秒后失效
    </n-button>
    <n-time-picker ref="timePickerInstRef" />
  </n-space>
</template>

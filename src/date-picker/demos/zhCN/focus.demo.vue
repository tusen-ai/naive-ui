<markdown>
# 手动 focus & blur
</markdown>

<script lang="ts" setup>
import type { DatePickerInst } from 'naive-ui'
import { ref } from 'vue'

const datePickerInstRef = ref<DatePickerInst | null>(null)

function handleClick() {
  datePickerInstRef.value?.focus()
  setTimeout(() => {
    datePickerInstRef.value?.blur()
  }, 1000)
}
</script>

<template>
  <n-space item-style="display: flex; align-item: center;">
    <n-button @click="handleClick">
      聚焦，一秒后失效
    </n-button>
    <n-date-picker ref="datePickerInstRef" style="width: 200px" />
  </n-space>
</template>

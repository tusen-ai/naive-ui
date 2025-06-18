<markdown>
# Focus & blur manually
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
      Focus then blur in 1 second
    </n-button>
    <n-date-picker ref="datePickerInstRef" style="width: 200px" />
  </n-space>
</template>

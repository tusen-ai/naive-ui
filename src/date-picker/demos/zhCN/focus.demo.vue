<markdown>
# 手动 focus & blur
</markdown>

<script lang="ts">
import type { DatePickerInst } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const datePickerInstRef = ref<DatePickerInst | null>(null)
    return {
      handleClick() {
        datePickerInstRef.value?.focus()
        setTimeout(() => {
          datePickerInstRef.value?.blur()
        }, 1000)
      },
      datePickerInstRef
    }
  }
})
</script>

<template>
  <n-space item-style="display: flex; align-item: center;">
    <n-button @click="handleClick">
      聚焦，一秒后失效
    </n-button>
    <n-date-picker ref="datePickerInstRef" style="width: 200px" />
  </n-space>
</template>

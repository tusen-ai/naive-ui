<markdown>
# 手动 focus & blur
</markdown>

<script lang="ts">
import type { TimePickerInst } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const timePickerInstRef = ref<TimePickerInst | null>(null)
    return {
      handleClick() {
        timePickerInstRef.value?.focus()
        setTimeout(() => {
          timePickerInstRef.value?.blur()
        }, 1000)
      },
      timePickerInstRef
    }
  }
})
</script>

<template>
  <n-space item-style="display: flex; align-item: center;">
    <n-button @click="handleClick">
      聚焦，一秒后失效
    </n-button>
    <n-time-picker ref="timePickerInstRef" />
  </n-space>
</template>

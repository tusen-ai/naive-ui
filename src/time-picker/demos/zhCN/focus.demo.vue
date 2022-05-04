<markdown>
# 手动 focus & blur
</markdown>

<template>
  <n-space item-style="display: flex; align-item: center;">
    <n-button @click="handleClick">
      聚焦，一秒后失效
    </n-button>
    <n-time-picker ref="timePickerInstRef" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { TimePickerInst } from 'naive-ui'

export default defineComponent({
  setup () {
    const timePickerInstRef = ref<TimePickerInst | null>(null)
    return {
      handleClick () {
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

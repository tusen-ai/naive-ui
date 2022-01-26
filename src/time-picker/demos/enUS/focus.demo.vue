<markdown>
# Focus & blur manually
</markdown>

<template>
  <n-space item-style="display: flex; align-item: center;">
    <n-button @click="handleClick">
      Focus then blur in 1 second
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

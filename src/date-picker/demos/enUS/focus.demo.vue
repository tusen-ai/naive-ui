<markdown>
# Focus & blur manually
</markdown>

<template>
  <n-space item-style="display: flex; align-item: center;">
    <n-button @click="handleClick">
      Focus then blur in 1 second
    </n-button>
    <n-date-picker ref="datePickerInstRef" style="width: 200px" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { DatePickerInst } from 'naive-ui'

export default defineComponent({
  setup () {
    const datePickerInstRef = ref<DatePickerInst | null>(null)
    return {
      handleClick () {
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

<markdown>
# Confirm
</markdown>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      handleConfirm(value: number | null) {
        message.success(`Confirm${value}`)
      }
    }
  }
})
</script>

<template>
  <n-space>
    <n-time-picker
      default-formatted-value="00:12:13"
      @confirm="handleConfirm"
    />
  </n-space>
</template>

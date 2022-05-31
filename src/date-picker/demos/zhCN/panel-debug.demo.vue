<markdown>
# 只使用面板
</markdown>

<template>
  <n-space vertical>
    <n-date-picker panel type="date" @update:value="log" />
    <n-date-picker panel type="datetime" @update:value="log" />
    <n-date-picker panel type="daterange" @update:value="log" />
    <n-date-picker panel type="datetimerange" @update:value="log" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      log (...args: unknown[]) {
        console.log('value', ...args)
      }
    }
  }
})
</script>

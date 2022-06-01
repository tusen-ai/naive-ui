<markdown>
# 只使用面板
</markdown>

<template>
  <n-space vertical>
    <n-date-picker panel type="date" @update:value="log" />
    <n-date-picker panel type="datetime" @update:value="log" />
    <n-date-picker panel type="daterange" @update:value="log" />
    <n-date-picker
      panel
      type="datetimerange"
      :default-time="['13:22:11', '16:00:00']"
      :shortcuts="rangeShortcuts"
      @update:value="log"
    />
    <n-date-picker panel type="month" @update:value="log" />
    <n-date-picker panel type="quarter" @update:value="log" />
    <n-date-picker panel type="year" @update:value="log" />
    <n-date-picker panel type="monthrange" @update:value="log" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      log (...args: unknown[]) {
        console.log('value', ...args)
      },
      rangeShortcuts: {
        快乐假期: [1629216000000, 1631203200000] as const,
        近2小时: () => {
          const cur = new Date().getTime()
          return [cur - 2 * 60 * 60 * 1000, cur] as const
        }
      }
    }
  }
})
</script>

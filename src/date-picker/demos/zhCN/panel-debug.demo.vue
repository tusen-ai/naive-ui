<markdown>
# 只使用面板 Debug
</markdown>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      log(...args: unknown[]) {
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

<template>
  <n-space vertical>
    <n-date-picker
      panel
      type="date"
      calendar-day-format="（eeeeee）"
      calendar-header-month-before-year
      calendar-header-year-format="（yyyy）"
      calendar-header-month-format="（MM）"
      calendar-header-month-year-separator="~"
      @update:value="log"
    />
    <n-date-picker
      panel
      type="datetime"
      calendar-day-format="（eeeeee）"
      calendar-header-month-before-year
      calendar-header-year-format="（yyyy）"
      calendar-header-month-format="（MM）"
      calendar-header-month-year-separator="~"
      @update:value="log"
    />
    <n-date-picker
      panel
      type="daterange"
      calendar-day-format="（eeeeee）"
      calendar-header-month-before-year
      calendar-header-year-format="（yyyy）"
      calendar-header-month-format="（MM）"
      calendar-header-month-year-separator="~"
      @update:value="log"
    />
    <n-date-picker
      panel
      type="datetimerange"
      calendar-day-format="（eeeeee）"
      calendar-header-month-before-year
      calendar-header-year-format="（yyyy）"
      calendar-header-month-format="（MM）"
      calendar-header-month-year-separator="~"
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

<markdown>
# 选择年、月后，关闭面板
</markdown>

<template>
  <n-space vertical>
    <span>选择年或月，关闭面板</span>
    <n-date-picker
      v-model:value="timestamp"
      close-panel-on-select-year
      close-panel-on-select-month
      type="date"
    />
    <span>选择年，关闭面板</span>
    <n-date-picker
      v-model:value="timestamp"
      close-panel-on-select-year
      type="datetime"
    />
    <span>选择月，关闭面板</span>
    <n-date-picker
      v-model:value="timestamp"
      close-panel-on-select-month
      type="week"
      clearable
    />
    <pre>{{ JSON.stringify(timestamp) }}</pre>

    <span>选择年，关闭面板</span>
    <n-date-picker
      v-model:value="range"
      close-panel-on-select-year
      type="daterange"
    />
    <span>选择月，关闭面板</span>
    <n-date-picker
      v-model:value="range"
      close-panel-on-select-month
      type="datetimerange"
    />
    <pre>{{ JSON.stringify(range) }}</pre>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      timestamp: ref(1183135260000),
      range: ref<[number, number]>([1183135260000, Date.now()])
    }
  }
})
</script>

<markdown>
# 默认时间

你可以设定选择某个日期后默认使用的时间。
</markdown>

<template>
  <n-space vertical>
    <n-date-picker type="datetime" clearable default-time="13:22:11" />
    <n-date-picker type="datetime" clearable default-time="16:00:00" />
    <n-date-picker type="datetimerange" clearable default-time="13:22:11" />
    <n-date-picker type="datetimerange" clearable :default-time="time1" />
    <n-date-picker
      type="datetimerange"
      clearable
      :default-time="['13:22:11', '16:00:00']"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      time1: ['16:00:00'] as unknown as [string, undefined]
    }
  }
})
</script>

<markdown>
# 默认时间

你可以设定选择某个日期后默认使用的时间。
</markdown>

<script setup lang="ts">
import { format, isAfter, isToday } from 'date-fns'

function getSingleDefaultTime(timestamp: number): string {
  const now = new Date()

  if (isToday(timestamp)) {
    return format(new Date(), 'HH:mm:ss')
  }
  if (isAfter(now, timestamp)) {
    return '23:59:59'
  }
  else {
    return '00:00:00'
  }
}

function getRangeDefaultTime(
  timestamp: number,
  position: 'start' | 'end'
): string {
  const now = new Date()

  if (position === 'start') {
    return '00:00:00'
  }

  if (isToday(timestamp)) {
    return format(new Date(), 'HH:mm:ss')
  }
  if (isAfter(now, timestamp)) {
    return '23:59:59'
  }
  else {
    return '00:00:00'
  }
}
</script>

<template>
  <n-space vertical>
    <n-date-picker type="datetime" clearable default-time="13:22:11" />
    <n-date-picker type="datetime" clearable default-time="16:00:00" />
    <n-date-picker
      type="datetime"
      clearable
      :default-time="getSingleDefaultTime"
    />
    <n-date-picker type="datetimerange" clearable default-time="13:22:11" />
    <n-date-picker
      type="datetimerange"
      clearable
      :default-time="['16:00:00', undefined]"
    />
    <n-date-picker
      type="datetimerange"
      clearable
      :default-time="['13:22:11', '16:00:00']"
    />
    <n-date-picker
      type="datetimerange"
      clearable
      :default-time="getRangeDefaultTime"
    />
  </n-space>
</template>

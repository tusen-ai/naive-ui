<markdown>
# 基础用法

一个普通的日历。
</markdown>

<script lang="ts" setup>
import { addDays, isYesterday } from 'date-fns'
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()
const value = ref(addDays(Date.now(), 1).valueOf())

function handleUpdateValue(
  _: number,
  { year, month, date }: { year: number, month: number, date: number }
) {
  message.success(`${year}-${month}-${date}`)
}

function isDateDisabled(timestamp: number) {
  if (isYesterday(timestamp)) {
    return true
  }
  return false
}
</script>

<template>
  <n-calendar
    v-model:value="value"
    #="{ year, month, date }"
    :is-date-disabled="isDateDisabled"
    @update:value="handleUpdateValue"
  >
    {{ year }}-{{ month }}-{{ date }}
  </n-calendar>
</template>

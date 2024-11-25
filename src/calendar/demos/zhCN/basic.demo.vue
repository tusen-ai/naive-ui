<markdown>
# 基础用法

一个普通的日历。
</markdown>

<script lang="ts">
import { addDays, isYesterday } from 'date-fns'
import { useMessage } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      value: ref(addDays(Date.now(), 1).valueOf()),
      handleUpdateValue(
        _: number,
        { year, month, date }: { year: number, month: number, date: number }
      ) {
        message.success(`${year}-${month}-${date}`)
      },
      isDateDisabled(timestamp: number) {
        if (isYesterday(timestamp)) {
          return true
        }
        return false
      }
    }
  }
})
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

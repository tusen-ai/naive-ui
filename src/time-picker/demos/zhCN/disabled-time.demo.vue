<markdown>
# 禁用某些时间

你可以禁用某些时间。
</markdown>
<template>
  <n-time-picker
    v-model:value="time0"
    :is-hour-disabled="isHourDisabled"
    :is-minute-disabled="isMinuteDisabled"
    :is-second-disabled="isSecondDisabled"
  />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      time0: ref(null),
      isHourDisabled (hour: number) {
        return hour % 2 === 0
      },
      isMinuteDisabled (minute: number, selectedHour: number | null) {
        if (selectedHour === null) return false
        if (Number(selectedHour) < 12) {
          return minute < 30
        } else {
          return false
        }
      },
      isSecondDisabled (
        second: number,
        selectedMinute: number | null,
        selectedHour: number | null
      ) {
        if (selectedHour === null || selectedMinute === null) return false
        if (Number(selectedHour) > 20 && Number(selectedMinute) < 30) {
          return second < 40
        } else {
          return false
        }
      }
    }
  }
})
</script>

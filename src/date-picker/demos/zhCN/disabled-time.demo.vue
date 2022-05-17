<markdown>
# 禁用特定时间
</markdown>

<template>
  <n-space vertical>
    禁用上半月
    <n-date-picker
      type="date"
      :default-value="Date.now()"
      :is-date-disabled="dateDisabled"
    />
    禁用上半月 & 下半个月的上午
    <n-date-picker
      type="datetime"
      :default-value="Date.now()"
      :is-date-disabled="dateDisabled"
      :is-time-disabled="timeDisabled"
    />
    间隔至少七天
    <n-date-picker
      type="daterange"
      :default-value="[Date.now(), Date.now() + 86400000]"
      :is-date-disabled="isRangeDateDisabled"
    />
    间隔至少七天
    <n-date-picker
      type="datetimerange"
      :default-value="[Date.now(), Date.now() + 86400000]"
      :is-date-disabled="isRangeDateDisabled"
      :is-time-disabled="isRangeTimeDisabled"
    />
    只能选过去的时间
    <n-date-picker
      type="daterange"
      :default-value="[Date.now(), Date.now() + 86400000]"
      :is-date-disabled="disablePreviousDate"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { startOfDay } from 'date-fns/esm'

const d = 86400000
const h = 3600000
const m = 60000
const s = 1000

export default defineComponent({
  setup () {
    return {
      dateDisabled (ts: number) {
        const date = new Date(ts).getDate()
        return date < 15
      },
      timeDisabled (ts: number) {
        const date = new Date(ts).getDate()
        return {
          isHourDisabled: (hour: number) => {
            return date >= 15 && hour < 12
          }
        }
      },
      isRangeDateDisabled (
        ts: number,
        type: 'start' | 'end',
        range: [number, number] | null
      ) {
        if (type === 'start' && range !== null) {
          return (
            startOfDay(range[1]).valueOf() - startOfDay(ts).valueOf() <= d * 6
          )
        }
        if (type === 'end' && range !== null) {
          return (
            startOfDay(ts).valueOf() - startOfDay(range[0]).valueOf() <= d * 6
          )
        }
        return false
      },
      isRangeTimeDisabled (
        current: number,
        type: 'start' | 'end',
        range: [number, number]
      ) {
        if (type === 'start') {
          return {
            isHourDisabled: (hour: number) => {
              return (
                range[1] - startOfDay(range[0]).valueOf() - hour * h < d * 7
              )
            },
            isMinuteDisabled: (minute: number, hour: number | null) => {
              if (hour === null) return false
              return (
                range[1] -
                  startOfDay(range[0]).valueOf() -
                  hour * h -
                  minute * m <
                d * 7
              )
            },
            isSecondDisabled: (
              second: number,
              minute: number | null,
              hour: number | null
            ) => {
              if (hour === null || minute === null) return false
              return (
                range[1] -
                  startOfDay(range[0]).valueOf() -
                  hour * h -
                  minute * m -
                  second * s <
                d * 7
              )
            }
          }
        } else {
          return {
            isHourDisabled: (hour: number) => {
              return (
                startOfDay(range[1]).valueOf() + hour * h + (h - s) - range[0] <
                d * 7
              )
            },
            isMinuteDisabled: (minute: number, hour: number | null) => {
              return (
                startOfDay(range[1]).valueOf() +
                  Number(hour) * h +
                  minute * m +
                  (m - s) -
                  range[0] <
                d * 7
              )
            },
            isSecondDisabled: (
              second: number,
              minute: number | null,
              hour: number | null
            ) => {
              if (hour === null || minute === null) return false
              return (
                startOfDay(range[1]).valueOf() +
                  hour * h +
                  minute * m +
                  second * s -
                  range[0] <
                d * 7
              )
            }
          }
        }
      },
      disablePreviousDate (ts: number) {
        return ts > Date.now()
      }
    }
  }
})
</script>

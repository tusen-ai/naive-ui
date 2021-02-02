# Disabled Specific Time

```html
<n-space vertical>
  Disable first half of the month
  <n-date-picker
    type="date"
    :default-value="Date.now()"
    :is-date-disabled="dateDisabled"
  />
  Disable first half of the month & AM at second half of the month
  <n-date-picker
    type="datetime"
    :default-value="Date.now()"
    :is-date-disabled="dateDisabled"
    :is-time-disabled="timeDisabled"
  />
  At least 7 days
  <n-date-picker
    type="daterange"
    :default-value="[Date.now(), Date.now() + 86400000]"
    :is-date-disabled="isRangeDateDisabled"
  />
  At least 7 days
  <n-date-picker
    type="datetimerange"
    :default-value="[Date.now(), Date.now() + 86400000]"
    :is-date-disabled="isRangeDateDisabled"
    :is-time-disabled="isRangeTimeDisabled"
  />
</n-space>
```

```js
import { startOfDay } from 'date-fns'

const d = 86400000
const h = 3600000
const m = 60000
const s = 1000

export default {
  setup () {
    return {
      dateDisabled (ts) {
        const date = new Date(ts).getDate()
        return date < 15
      },
      timeDisabled (ts) {
        const date = new Date(ts).getDate()
        return {
          isHourDisabled: (hour) => {
            return date >= 15 && hour < 12
          }
        }
      },
      isRangeDateDisabled (ts, type, range) {
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
      },
      isRangeTimeDisabled (current, type, range) {
        if (type === 'start') {
          return {
            isHourDisabled: (hour) => {
              return (
                range[1] - startOfDay(range[0]).valueOf() - hour * h < d * 7
              )
            },
            isMinuteDisabled: (minute, hour) => {
              return (
                range[1] -
                  startOfDay(range[0]).valueOf() -
                  hour * h -
                  minute * m <
                d * 7
              )
            },
            isSecondDisabled: (second, minute, hour) => {
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
            isHourDisabled: (hour) => {
              return (
                startOfDay(range[1]).valueOf() + hour * h + (h - s) - range[0] <
                d * 7
              )
            },
            isMinuteDisabled: (minute, hour) => {
              return (
                startOfDay(range[1]).valueOf() +
                  hour * h +
                  minute * m +
                  (m - s) -
                  range[0] <
                d * 7
              )
            },
            isSecondDisabled: (second, minute, hour) => {
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
      }
    }
  }
}
```

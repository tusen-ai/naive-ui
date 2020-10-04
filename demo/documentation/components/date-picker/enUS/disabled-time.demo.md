# Disabled Specific Time
```html
<n-date-picker
  v-model:value="timestamp1"
  type="date"
  :is-date-disabled = "dateDisabled"
/>
<n-date-picker
  v-model:value="timestamp2"
  type="datetime"
  :is-date-disabled = "dateDisabled"
  :is-time-disabled= "timeDisabled"
/>
<n-date-picker
  v-model:value="timestamp3"
  type="daterange"
  :is-date-disabled = "isRangeDateDisabled"
/>
<n-date-picker
  v-model:value="timestamp4"
  type="datetimerange"
  :is-date-disabled = "isRangeDateDisabled"
  :is-time-disabled= "isRangeTimeDisabled"
/>
```
```js
export default {
  data () {
    return {
      timestamp1: 1576239200000,
      timestamp2: 1576234000000,
      timestamp3: [1576439200000, 1576739200000],
      timestamp4: [1576234000000, 1576934000000],
    }
  },
  methods: {
    dateDisabled (current) {
      const month = (new Date(current)).getMonth()
      const date = (new Date(current)).getDate()
      return month === 11 && date < 15
    },
    timeDisabled (current) {
      const month = (new Date(current)).getMonth()
      return {
        isHourDisabled: (hour) => {
          if (month === 11) {
            return hour > 1 && hour <= 19
          } else {
            return false
          }
        },
        isMinuteDisabled: (minute, selectedHour) => {
          if (month === 11 && selectedHour === 22) {
            return minute >= 20 && minute <= 30
          } else {
            return false
          }
        },
        isSecondDisabled: (second, selectedMinute, selectedHour) => {
          if (month === 11 && selectedHour === 12 && selectedMinute >= 40 && selectedMinute <= 50) {
            return second >= 20 && second <= 30
          } else {
            return false
          }
        }
      }
    },
    isRangeDateDisabled (current, type, range) {
      const currentDate = new Date(current)
      if (type === 'start') {
        if (currentDate.getMonth() === 11) {
          return currentDate.getDate() > 15
        }
      } else if (type === 'end') {
        if (range) {
          const [start, end] = range
          return currentDate < start
        }
      }
    },
    isRangeTimeDisabled (current, type, range) {
      const month = (new Date(current)).getMonth()
      return {
        isHourDisabled: (hour) => {
          if (month === 11) {
            return hour > 1 && hour <= 19
          } else {
            return false
          }
        },
        isMinuteDisabled: (minute, selectedHour) => {
          // debugger
          if (month === 11 && selectedHour === 22) {
            return minute >= 20 && minute <= 30
          } else {
            return false
          }
        },
        isSecondDisabled: (second, selectedMinute, selectedHour) => {
          if (month === 11 && selectedHour === 12 && selectedMinute >= 40 && selectedMinute <= 50) {
            return second >= 20 && second <= 30
          } else {
            return false
          }
        }
      }
    },
  },
}
```
```css
.n-date-picker {
  margin: 0 12px 8px 0;
}
```
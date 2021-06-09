# 禁用某些时间

你可以禁用某些时间。

```html
<n-time-picker
  v-model:value="time0"
  :is-hour-disabled="isHourDisabled"
  :is-minute-disabled="isMinuteDisabled"
  :is-second-disabled="isSecondDisabled"
  :seconds="['05','10']"
  :hours="['01','02']"
  minutes="10"

/>
```

```js
export default {
  data () {
    return {
      time0: null
    }
  },
  methods: {
    isHourDisabled (hour) {
      return hour % 2 === 0
    },
    isMinuteDisabled (minute, selectedHour) {
      if (selectedHour === null) return false
      if (Number(selectedHour) < 12) {
        return minute < 30
      } else {
        return false
      }
    },
    isSecondDisabled (second, selectedMinute, selectedHour) {
      if (selectedHour === null || selectedMinute === null) return false
      if (Number(selectedHour) > 20 && Number(selectedMinute) < 30) {
        return second < 40
      } else {
        return false
      }
    }
  }
}
```

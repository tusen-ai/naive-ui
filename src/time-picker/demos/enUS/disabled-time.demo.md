# Disable time

If you can't stop time, at least disable it.

```html
<n-time-picker
  v-model:value="time0"
  :is-hour-disabled="isHourDisabled"
  :is-minute-disabled="isMinuteDisabled"
  :is-second-disabled="isSecondDisabled"
/>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      time0: ref(null),
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
})
```

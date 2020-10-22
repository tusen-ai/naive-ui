# Basic
```html
<n-space>
  <n-time-picker
    v-model:value="time0"
    :disabledHours="disabledHours"
    :disabledMinutes="disabledMinutes"
    :disabledSeconds="disabledSeconds"
  />
  <n-time-picker v-model:value="time1" />
</n-space>
```
```js
export default {
  data () {
    return {
      time0: null,
      time1: 1183135260000
    }
  },
  methods: {
    disabledHours (hour) {
      return hour > 13 && hour < 16
    },
    disabledMinutes (minute, selectedHour) {
      if(Number(selectedHour) === 17) {
        return minute > 13 &&  minute < 40
      }
    },
    disabledSeconds (second, selectedHour, selectedMinute) {
       if(Number(selectedHour) === 17 && Number(selectedMinute) === 10)  {
        return second > 13 &&  second < 40
      }
    }
  }
}
```

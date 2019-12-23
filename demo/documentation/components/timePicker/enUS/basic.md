# Basic
```html
<n-time-picker
  v-model="time0"
  :disabledHours="disabledHours"
  :disabledMinutes="disabledMinutes"
  :disabledSeconds="disabledSeconds"
/>
<n-time-picker v-model="time1" />
```
```js
export default {
  data () {
    return {
      time0: null,
      time1: 1563937380000
    }
  },
  methods: {
    disabledHours (hour) {
      return hour>13 && hour<16
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
```css
.n-time-picker {
  margin: 0 12px 8px 0;
}
```
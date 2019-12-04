# Disabled Time
```html
<n-time-picker
  v-model="time0"
  :hourDisabled="disabledHours"
  :minuteDisabled="disabledMinutes"
  :secondDisabled="disabledSeconds"
/>

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
        return minute >=0  &&  minute < 9
      } else {
        return false
      }
    },
    disabledSeconds (second, selectedMinute, selectedHour) {
       if(Number(selectedHour) === 17 && Number(selectedMinute) === 10)  {
        return second > 13 &&  second < 40
      } else {
        return false
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
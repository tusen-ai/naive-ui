# Disabled Time
```html
<n-date-picker
  v-model="timestamp1"
  type="date"
  :date-disabled = "dateDisabled"
/>
{{timestamp1}}
<n-date-picker
  v-model="timestamp2"
  type="datetime"
  :date-disabled = "dateDisabled"
  :timeDisabled= "timeDisabled"
/>
<n-date-picker
  v-model="timestamp3"
  type="daterange"
  :date-disabled = "dateRangeDisabled"
/>
<n-date-picker
  v-model="timestamp4"
  type="datetimerange"
  :date-disabled = "dateRangeDisabled"
  :time-disabled= "timeRangeDisabled"
/>
```
```js
export default {
  data () {
    return {
      timestamp1: null,
      timestamp2: null,
      timestamp3: null,
      timestamp4: null,
    }
  },
  methods: {
    dateDisabled (current) {
      console.log(current)
      return current > 1576598400000 && current < 1576857600000
      // Tue Nov 12 2019 17:49:42 GMT+0800 (China Standard Time) -
      // Fri Nov 15 2019 17:49:42 GMT+0800 (China Standard Time)
    },
    timeDisabled (current) {
      console.log('current', current)
      return {
        hourDisabled: (hour) => {
          if (current===1576598400000) {
            return hour > 1 && hour <= 19
          } else {
            return true
          }
        },
        minuteDisabled: (minute, selectedHour) => {
          console.log('selectedHour', selectedHour)
          if(current===1576598400000 && selectedHour===15) {
            return minute>=20 && minute<=30
          } else if (current===1576512000000) {
            return minute>=0
            }else {
            return false
          }
        },
        secondDisabled: (second, selectedMinute, selectedHour) => {
          if(current===1576598400000 && selectedHour===12 && selectedMinute>=40 && selectedMinute<=50) {
            return second>=20 && second<=30
          }　else {
            return false
          }
        },
      }
    },
    dateRangeDisabled(current, type) {
      if (type === 'start') {
        console.log('start', current)
        return current > 1576598400000 && current < 1576857600000
      } else if (type==='end') {
        return current<=1577462400000
      } else {
        return false
      }
    },
    timeRangeDisabled(current, type) {
      if (type === 'start') {
        return {
          hourDisabled: (hour) => {
            if (current===1576598400000) {
              return hour > 1 && hour <= 19
            } else {
              return true
            }
          },
          minuteDisabled: (minute, selectedHour) => {
            console.log('selectedHour', selectedHour)
            // debugger
            if(current===1576598400000 && selectedHour===20) {
              // debugger
              return minute>=20 && minute<=30
            } else if (current===1576512000000) {
              return minute>=0
              }else {
              return false
            }
          },
          secondDisabled: (second, selectedMinute, selectedHour) => {
            if(current===1576598400000 && selectedHour===12 && selectedMinute>=40 && selectedMinute<=50) {
              return second>=20 && second<=30
            }　else {
              return false
            }
          },
        }
      }
    }
  }
}
```
```css
.n-date-picker {
  margin: 0 12px 8px 0;
}
```
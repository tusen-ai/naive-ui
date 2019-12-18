# Disabled Time
```html
<n-date-picker
  v-model="timestamp1"
  type="date"
  :date-disabled = "dateDisabled"
/>
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
      timestamp1: 1576339200000,
      timestamp2: null,
      timestamp3: null,
      timestamp4: null,
    }
  },
  methods: {
    dateDisabled (current) {
      return current >= 1576339200000 && current <= 1576425600000
      // Tue Nov 12 2019 17:49:42 GMT+0800 (China Standard Time) -
      // Fri Nov 15 2019 17:49:42 GMT+0800 (China Standard Time)
    },
    timeDisabled (current) {
      return {
        hourDisabled: (hour) => {
          if (current===1576512000000) {
            return hour > 1 && hour <= 19
          } else {
            return false
          }
        },
        minuteDisabled: (minute, selectedHour) => {
          if(current===1576512000000 && selectedHour===22) {
            return minute>=20 && minute<=30
          } else {
            return false
          }
        },
        secondDisabled: (second, selectedMinute, selectedHour) => {
          if(current===1576512000000 && selectedHour===12 && selectedMinute>=40 && selectedMinute<=50) {
            return second>=20 && second<=30
          }　else {
            return false
          }
        },
      }
    },
    dateRangeDisabled(current) {
        return current >= 1576339200000 && current <= 1576425600000
    },
    timeRangeDisabled(current, type) {
      if (type === 'start') {
        return {
          hourDisabled: (hour) => {
            if (current[0]===1576512000000) {
              return hour > 1 && hour <= 19
            } 
          },
          minuteDisabled: (minute, selectedHour) => {
            if(current[0]===1576512000000 && selectedHour===20) {
              return minute>=20 && minute<=30
            } 
          },
          secondDisabled: (second, selectedMinute, selectedHour) => {
            if(current[0]===1576512000000 && selectedHour===12 && selectedMinute>=40 && selectedMinute<=50) {
              return second>=20 && second<=30
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
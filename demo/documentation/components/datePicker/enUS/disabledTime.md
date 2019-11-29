# Disabled Time
```html
<n-date-picker
  v-model="timestamp1"
  type="date"
  :disabledTime= "disabledTime"
/>
<n-date-picker
  v-model="timestamp2"
  type="datetime"
  :disabledTime= "disabledTime"
/>
<n-date-picker
  v-model="timestamp3"
  type="daterange"
  :disabledTime= "disabledTime"
/>
{{timestamp3}}
<n-date-picker
  v-model="timestamp4"
  type="datetimerange"
  :disabledTime= "disabledTime"
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
    disabledTime (current) {
      return current > 1573552182000 && current < 1573811382000
      // Tue Nov 12 2019 17:49:42 GMT+0800 (China Standard Time) -
      // Fri Nov 15 2019 17:49:42 GMT+0800 (China Standard Time)
    }
  }
}
```
```css
.n-date-picker {
  margin: 0 12px 8px 0;
}
```
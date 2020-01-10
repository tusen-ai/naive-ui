# Datetime
```html
<n-date-picker
  v-model="timestamp"
  type="datetime"
  :disabledTime= "disabledTime"
/>
<n-date-picker v-model="timestamp2" type="datetime" />
```
```js
export default {
  data () {
    return {
      timestamp: null,
      timestamp2: 1000000
    }
  },
  methods: {
    disabledTime (current) {
      return current > 1573552182000 && current < 1573811382000
    }
  }
}
```
```css
.n-date-picker {
  margin: 0 12px 8px 0;
}
```
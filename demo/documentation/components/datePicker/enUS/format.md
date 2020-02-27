# Format
```html
<n-date-picker
  v-model="timestamp"
  type="datetime"
  :disabledTime= "disabledTime"
  clearable
  :format="format"
/>
<n-date-picker v-model="timestamp2" type="datetime" :format="format" clearable />
```
```js
export default {
  data () {
    return {
      timestamp: null,
      timestamp2: 1000000,
      format: 'yyyy/MM/dd - HH:mm'
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
# Date
```html
<n-date-picker
  v-model="timestamp"
  type="date"
  :disabledTime="disabledTime"
/>
{{timestamp}}
<n-date-picker v-model="timestamp2" type="date" />
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
      return (current >= 1574092800000) && (current < 1574438400000)
    }
  }
}
```
```css
.n-date-picker {
  margin: 0 12px 8px 0;
}
```
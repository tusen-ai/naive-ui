# Date
```html
<n-date-picker
  v-model="timestamp"
  type="datetime"
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
  }
}
```
```css
.n-date-picker {
  margin: 0 12px 8px 0;
}
```
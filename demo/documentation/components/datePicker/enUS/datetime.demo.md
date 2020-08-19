# Datetime
```html
<n-date-picker
  v-model="timestamp"
  type="datetime"
  clearable
/>
<pre>{{ JSON.stringify(timestamp) }}</pre>
```
```js
export default {
  data () {
    return {
      timestamp: 1183135260000
    }
  }
}
```
```css
.n-date-picker {
  margin: 0 12px 8px 0;
}
```
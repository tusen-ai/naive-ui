# 日期
```html
<n-date-picker
  v-model:value="timestamp"
  type="date"
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
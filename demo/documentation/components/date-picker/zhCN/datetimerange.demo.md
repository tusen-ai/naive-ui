# 日期时间范围
```html
<n-date-picker
  v-model:value="range"
  type="datetimerange"
  clearable
/>
<pre>{{ JSON.stringify(range) }}</pre>
```
```js
export default {
  data() {
    return {
      range: [1183135260000, Date.now()]
    }
  }
}
```
```css
.n-date-picker {
  margin: 0 12px 8px 0;
}
```

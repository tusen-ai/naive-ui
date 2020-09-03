# Date Range
```html
<n-date-picker
  v-model="range"
  type="daterange"
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

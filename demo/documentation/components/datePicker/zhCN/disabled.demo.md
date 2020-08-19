# 禁用
```html
<n-date-picker
  v-model="date"
  type="date"
  :disabled="disabled"
/>
<n-date-picker
  v-model="datetime"
  type="datetime"
  :disabled="disabled"
/>
<n-date-picker
  v-model="daterange"
  :disabled="disabled"
  type="daterange"
/>
<n-date-picker
  v-model="datetimerange"
  :disabled="disabled"
  type="datetimerange"
/>
<n-switch v-model="disabled" />
```
```js
export default {
  data () {
    return {
      datetime: null,
      date: null,
      datetimerange: null,
      daterange: null,
      disabled: true
    }
  }
}
```
```css
.n-date-picker {
  margin: 0 12px 8px 0;
}
```
# 格式化
```html
<n-date-picker
  v-model="timestamp"
  type="datetime"
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
      timestamp2: 1183135260000,
      format: 'yyyy/MM/dd - HH:mm'
    }
  }
}
```
```css
.n-date-picker {
  margin: 0 12px 8px 0;
}
```
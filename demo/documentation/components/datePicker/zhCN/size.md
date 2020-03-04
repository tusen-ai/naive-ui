# 尺寸
有 `small`、`medium` 和 `large` 尺寸。
```html
<n-date-picker
  v-model="timestamp"
  size="small"
  type="date"
/>
<n-date-picker
  v-model="timestamp"
  size="medium"
  type="date"
/>
<n-date-picker
  v-model="timestamp"
  size="large"
  type="date"
/>
```
```js
export default {
  data () {
    return {
      timestamp: null
    }
  }
}
```
```css
.n-date-picker {
  margin-bottom: 8px
}
```
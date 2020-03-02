# 尺寸
Time Picker 可以是 `small`、`medium` 或 `large` 尺寸。
```html
<n-time-picker
  v-model="timestamp"
  size="small"
/>
<n-time-picker
  v-model="timestamp"
  size="medium"
/>
<n-time-picker
  v-model="timestamp"
  size="large"
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
.n-time-picker {
  margin: 0 8px 12px 0;
}
```
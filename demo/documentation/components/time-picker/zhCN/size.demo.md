# 尺寸
可以是 `small`、`medium` 或 `large` 尺寸。
```html
<n-time-picker
  v-model:value="timestamp"
  size="small"
/>
<n-time-picker
  v-model:value="timestamp"
  size="medium"
/>
<n-time-picker
  v-model:value="timestamp"
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
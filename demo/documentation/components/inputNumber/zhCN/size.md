# 尺寸
`small`、`medium`、`large`。
```html
<n-input-number
  v-model="value"
  size="small"
/>
<n-input-number
  v-model="value"
  size="medium"
/>
<n-input-number
  v-model="value"
  size="large"
/>
```
```js
export default {
  data () {
    return {
      value: 0
    }
  }
}
```
```css
.n-input-number {
  margin: 0 8px 12px 0
}
```

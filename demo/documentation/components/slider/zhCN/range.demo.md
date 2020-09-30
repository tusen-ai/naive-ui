# 范围
```html
<n-slider
  v-model:value="value"
  range
  :step="1"
/>
<n-input-number
  size="small"
  v-model:value="value[0]"
/>
<n-input-number
  size="small"
  v-model:value="value[1]"
/>
```
```js
export default {
  data () {
    return {
      value: [50, 70]
    }
  }
}
```
```css
.n-slider {
  margin-bottom: 8px;
}
.n-input-number {
  margin: 0 12px 8px 0;
}
```
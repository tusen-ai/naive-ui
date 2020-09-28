# 自动调整尺寸
Textarea 自动调整尺寸。
```html
<n-input
  v-model:value="value"
  placeholder="自动调整尺寸"
  type="textarea"
  size="small"
  :autosize="{
    minRows: 3,
    maxRows: 5
  }"
/>
<n-input
  v-model:value="value"
  type="textarea"
  placeholder="自动调整尺寸"
  :autosize="{
    minRows: 3
  }"
/>
```
```js
export default {
  data() {
    return {
      value: null
    }
  }
}
```
```css
.n-input {
  margin-bottom: 8px;
}
```
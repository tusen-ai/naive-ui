# Autosize
Make textarea autosizable.
```html
<n-input
  v-model:value="value"
  placeholder="Autosizable"
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
  placeholder="Autosizable"
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
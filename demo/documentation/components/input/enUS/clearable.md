# Clearable
Make input clearable when value is set.
```html
<n-input
  v-model="value"
  type="input"
  placeholder="Content is clearable"
  clearable
/>
<n-input
  v-model="value"
  type="password"
  placeholder="Content is clearable"
  clearable
/>
<n-input
  v-model="value"
  type="textarea"
  placeholder="Content is clearable"
  round
  clearable
/>
<n-button size="small" @click="value = 'Content is clearable'">Fill Content</n-button>
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
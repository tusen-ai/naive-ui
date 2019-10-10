# Disabled
Input can be disabled.
```html
<n-input
  v-model="value"
  type="input"
  size="small"
  placeholder="Oops! It is disabled."
  :disabled="!active"
  round
/>
<n-input
  v-model="value"
  type="textarea"
  size="small"
  placeholder="Oops! It is disabled."
  :disabled="!active"
  round
/>
<n-switch v-model="active" />
```
```js
export default {
  data() {
    return {
      active: false,
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
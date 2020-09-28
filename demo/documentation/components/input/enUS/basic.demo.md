# Basic
Basic usage of input.
```html
<n-input v-model:value="value" type="input" placeholder="Basic Input"/>
<n-input v-model:value="value" type="textarea"  placeholder="Basic Textarea"/>
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
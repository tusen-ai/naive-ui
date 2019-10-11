# Basic
```html
<n-checkbox v-model="value">Checkbox</n-checkbox>
<n-checkbox v-model="value"/>
<n-checkbox v-model="value" :disabled="disabled">Checkbox</n-checkbox>
<n-button @click="disabled = !disabled" size="small">Disabled</n-button>
```
```js
export default {
  data() {
    return {
      value: false,
      disabled: true
    }
  }
}
```
```css
.n-checkbox, .n-button {
  margin: 0 12px 8px 0;
}
```
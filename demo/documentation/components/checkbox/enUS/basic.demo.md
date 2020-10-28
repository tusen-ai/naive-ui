# Basic
```html
<n-checkbox v-model:checked="value">Checkbox</n-checkbox>
<n-checkbox v-model:checked="value"/>
<n-checkbox v-model:checked="value" :disabled="disabled">Checkbox</n-checkbox>
<n-button @click="disabled = !disabled" size="small">Disabled</n-button>
```
```js
export default {
  data () {
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
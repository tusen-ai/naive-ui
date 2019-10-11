# Indeterminate
```html
<n-checkbox v-model="value" :indeterminate="indeterminate">checkbox</n-checkbox>
<n-checkbox v-model="value" :indeterminate="indeterminate"/>
<n-checkbox v-model="value" :indeterminate="indeterminate" disabled/>
<n-button @click="value = !value">Check</n-button>
<n-button @click="indeterminate = !indeterminate">Indeterminate</n-button>
```
```js
export default {
  data() {
    return {
      value: false,
      indeterminate: false
    }
  }
}
```
```css
.n-checkbox, .n-button {
  margin: 0 12px 8px 0;
}
```
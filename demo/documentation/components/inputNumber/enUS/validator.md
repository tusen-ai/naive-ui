# Validator
```html
<n-input-number
  v-model="value"
  :validator="validator"
/>
```
```js
export default {
  data () {
    return {
      value: null,
      validator: x => x > 0
    }
  }
}
```
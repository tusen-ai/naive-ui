# Basic
```html
<n-slider
  v-model="value"
  :step="10"
/>
<n-input-number
  v-model="value"
/>
```
```js
export default {
  data () {
    return {
      value: 50
    }
  }
}
```
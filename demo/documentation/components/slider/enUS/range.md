# Range
```html
<n-slider
  v-model="value"
  range
  :step="1"
/>
<n-input-number
  v-model="value[0]"
/>
<n-input-number
  v-model="value[1]"
/>
```
```js
export default {
  data () {
    return {
      value: [50, 70]
    }
  }
}
```
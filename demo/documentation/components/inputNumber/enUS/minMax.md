# Min and Max
```html
<n-input-number
  v-model="value"
  :min="-3"
  :max="5"
/>
<n-input-number
  v-model="value"
  :min="-5"
  :max="3"
/>
```
```js
export default {
  data () {
    return {
      value: 0
    }
  }
}
```
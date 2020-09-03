# Min and Max
You can set min & max of it.
```html
<n-input-number
  v-model="value"
  placeholder="Min"
  :min="-3"
  :max="5"
/>
<n-input-number
  v-model="value"
  placeholder="Max"
  :min="-5"
  :max="3"
/>
```
```js
export default {
  data () {
    return {
      value: null
    }
  }
}
```
```css
.n-input-number {
  margin: 0 8px 12px 0
}
```
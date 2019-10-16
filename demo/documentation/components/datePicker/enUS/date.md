# Date
```html
<n-date-picker
  v-model="timestamp"
  type="date"
/>
<n-date-picker v-model="timestamp2" type="date" />
```
```js
export default {
  data () {
    return {
      timestamp: null,
      timestamp2: 1000000
    }
  }
}
```
```css
.n-date-picker {
  margin: 0 12px 8px 0;
}
```
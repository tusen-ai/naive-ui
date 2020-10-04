# Size
Date Picker can be `small`, `medium` or `large` sized.
```html
<n-date-picker
  v-model:value="timestamp"
  size="small"
  type="date"
/>
<n-date-picker
  v-model:value="timestamp"
  size="medium"
  type="date"
/>
<n-date-picker
  v-model:value="timestamp"
  size="large"
  type="date"
/>
```
```js
export default {
  data () {
    return {
      timestamp: null
    }
  }
}
```
```css
.n-date-picker {
  margin-bottom: 8px
}
```
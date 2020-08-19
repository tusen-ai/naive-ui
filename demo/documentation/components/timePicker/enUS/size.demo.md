# Size
Time Picker can be `small`, `medium` or `large` sized.
```html
<n-time-picker
  v-model="timestamp"
  size="small"
/>
<n-time-picker
  v-model="timestamp"
  size="medium"
/>
<n-time-picker
  v-model="timestamp"
  size="large"
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
.n-time-picker {
  margin: 0 8px 12px 0;
}
```
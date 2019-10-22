# Basic
```html
<n-slider
  v-model="value"
  :step="10"
/>
<n-input-number
  size="small"
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
```css
.n-slider {
  margin-bottom: 8px;
}
```
# Basic
```html
<n-time-picker
  v-model="time0"
/>
<n-time-picker v-model="time1" />
```
```js
export default {
  data () {
    return {
      time0: null,
      time1: 1563937380000
    }
  }
}
```
```css
.n-time-picker {
  margin: 0 12px 8px 0;
}
```
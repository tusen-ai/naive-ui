# Date Range
```html
<n-date-picker
  v-model="range1"
  type="daterange"
/>
<n-date-picker
  v-model="range2"
  type="daterange"
/>
```
```js
export default {
  data() {
    return {
      range1: null,
      range2: [1562774466000, 1567180866000]
    };
  }
}
```
```css
.n-date-picker {
  margin: 0 12px 8px 0;
}
```

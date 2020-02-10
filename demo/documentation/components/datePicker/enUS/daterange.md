# Date Range
```html
<n-date-picker
  v-model="range1"
  type="daterange"
  clearable
  :disabledTime="disabledTime"
/>
<n-date-picker
  v-model="range2"
  type="daterange"
  clearable
/>
```
```js
export default {
  data() {
    return {
      range1: null,
      range2: [1562774466000, 1567180866000]
    };
  },
  methods: {
    disabledTime (current) {
      return (current >= 1574092800000) && (current < 1576771200000)
    }
  }
}
```
```css
.n-date-picker {
  margin: 0 12px 8px 0;
}
```

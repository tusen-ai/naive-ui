# 日期时间范围
```html
<n-date-picker
  v-model="range1"
  type="datetimerange"
  clearable
/>
<n-date-picker
  v-model="range2"
  type="datetimerange"
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
  }
};
```
```css
.n-date-picker {
  margin: 0 0 8px 0;
}
```
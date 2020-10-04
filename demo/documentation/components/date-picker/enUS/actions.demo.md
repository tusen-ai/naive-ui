# Actions
```html
<n-date-picker
  v-model:value="ts1"
  type="date"
  :actions="['confirm']"
  style="margin-bottom: 12px;"
/>
<n-date-picker
  v-model:value="ts2"
  type="datetime"
  style="margin-right: 12px; margin-bottom: 12px;"
  :actions="['now']"
/>
<n-date-picker
  v-model:value="range1"
  type="daterange"
  :actions="null"
  style="margin-bottom: 12px;"
/>
<n-date-picker
  v-model:value="range2"
  type="datetimerange"
  style="margin-bottom: 12px;"
  :actions="['clear']"
/>
```
```js
export default {
  data() {
    return {
      ts1: null,
      ts2: 1183135260000,
      range1: null,
      range2: null
    }
  }
}
```
```css
.n-date-picker {
  margin: 0 12px 8px 0;
}
```
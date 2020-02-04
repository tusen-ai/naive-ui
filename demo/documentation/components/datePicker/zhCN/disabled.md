# 禁用
```html
<n-date-picker
  v-model="datetime"
  type="datetime"
  :disabled="disabled"
  @change="onDateTimeChange"
/>
<n-date-picker
  v-model="datetime"
  type="date"
  :disabled="disabled"
  @change="onDateChange"
/>
<n-date-picker
  v-model="datetimerange"
  :disabled="disabled"
  type="datetimerange"
/>
<n-date-picker v-model="daterange" :disabled="disabled" type="daterange" />
<n-switch v-model="disabled" />
```
```js
export default {
  data() {
    return {
      datetime: 891360258000,
      date: null,
      datetimerange: [324910284, 910391323],
      daterange: [324910284, 910391323],
      disabled: true
    };
  },
  methods: {
    onDateTimeChange(timestamp, dateTimeString) {
      this.$NMessage.success(`${timestamp}, ${dateTimeString}`);
    },
    onDateChange(timestamp, dateString) {
      this.$NMessage.success(`${timestamp}, ${dateString}`);
    }
  }
};
```
```css
.n-date-picker {
  margin: 0 12px 8px 0;
}
```
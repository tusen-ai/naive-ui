# 禁用
```html
<n-space vertical>
  <n-date-picker
    v-model:value="date"
    type="date"
    :disabled="disabled"
  />
  <n-date-picker
    v-model:value="datetime"
    type="datetime"
    :disabled="disabled"
  />
  <n-date-picker
    v-model:value="daterange"
    :disabled="disabled"
    type="daterange"
  />
  <n-date-picker
    v-model:value="datetimerange"
    :disabled="disabled"
    type="datetimerange"
  />
  <n-switch v-model:value="disabled" />
</n-space>
```
```js
export default {
  data () {
    return {
      datetime: null,
      date: null,
      datetimerange: null,
      daterange: null,
      disabled: true
    }
  }
}
```

# 操作
```html
<n-space vertical>
  <n-date-picker
    v-model:value="ts1"
    type="date"
    :actions="['confirm']"
  />
  <n-date-picker
    v-model:value="ts2"
    type="datetime"
    :actions="['now']"
  />
  <n-date-picker
    v-model:value="range1"
    type="daterange"
    :actions="null"
  />
  <n-date-picker
    v-model:value="range2"
    type="datetimerange"
    :actions="['clear']"
  />
</n-space>
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
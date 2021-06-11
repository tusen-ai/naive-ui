# Extra Footer

```html
<n-space vertical>
  <n-date-picker v-model:value="date" type="date">
    <template #footer> extra footer </template>
  </n-date-picker>
  <n-date-picker v-model:value="datetime" type="datetime">
    <template #footer> extra footer </template>
  </n-date-picker>
  <n-date-picker v-model:value="daterange" type="daterange">
    <template #footer> extra footer </template>
  </n-date-picker>
  <n-date-picker v-model:value="datetimerange" type="datetimerange">
    <template #footer> extra footer </template>
  </n-date-picker>
</n-space>
```

```js
export default {
  data () {
    return {
      datetime: null,
      date: null,
      datetimerange: null,
      daterange: null
    }
  }
}
```

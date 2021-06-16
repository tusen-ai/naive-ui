# Update Value On Close

```html
<n-space vertical>
  <n-date-picker
    v-model:value="datetime"
    type="datetime"
    :update-value-on-close="updateValueOnClose"
  />
  <n-date-picker
    v-model:value="daterange"
    :update-value-on-close="updateValueOnClose"
    type="daterange"
  />
  <n-date-picker
    v-model:value="datetimerange"
    :update-value-on-close="updateValueOnClose"
    type="datetimerange"
  />
  <n-switch v-model:value="updateValueOnClose" />
</n-space>
```

```js
export default {
  data () {
    return {
      datetime: null,
      datetimerange: null,
      daterange: null,
      updateValueOnClose: true
    }
  }
}
```

# Size
Time Picker can be `small`, `medium` or `large` sized.
```html
<n-space vertical>
  <n-time-picker
    v-model:value="timestamp"
    size="small"
  />
  <n-time-picker
    v-model:value="timestamp"
    size="medium"
  />
  <n-time-picker
    v-model:value="timestamp"
    size="large"
  />
</n-space>
```
```js
export default {
  data () {
    return {
      timestamp: null
    }
  }
}
```

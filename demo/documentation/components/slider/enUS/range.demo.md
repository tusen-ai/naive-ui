# Range
```html
<n-space vertical align="stretch">
  <n-slider
    v-model:value="value"
    range
    :step="1"
  />
  <n-space>
    <n-input-number
      size="small"
      v-model:value="value[0]"
    />
    <n-input-number
      size="small"
      v-model:value="value[1]"
    />
  </n-space>
</n-space>
```
```js
export default {
  data () {
    return {
      value: [50, 70]
    }
  }
}
```

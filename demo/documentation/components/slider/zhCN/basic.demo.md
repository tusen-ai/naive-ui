# 基础用法
```html
<n-space vertical>
  <n-slider
    v-model:value="value"
    :step="10"
  />
  <n-input-number
    size="small"
    v-model:value="value"
  />
</n-space>
```
```js
export default {
  data () {
    return {
      value: 50
    }
  }
}
```

# 自动调整尺寸

Textarea 自动调整尺寸。

```html
<n-space vertical>
  <n-input
    v-model:value="value"
    placeholder="自动调整尺寸"
    type="textarea"
    size="small"
    :autosize="{
      minRows: 3,
      maxRows: 5
    }"
  />
  <n-input
    v-model:value="value"
    type="textarea"
    placeholder="自动调整尺寸"
    :autosize="{
      minRows: 3
    }"
  />
</n-space>
```

```js
export default {
  data () {
    return {
      value: null
    }
  }
}
```

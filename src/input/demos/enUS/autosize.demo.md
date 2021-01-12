# Autosize

Make textarea autosizable.

```html
<n-space vertical>
  <n-input
    v-model:value="value"
    placeholder="Autosizable"
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
    placeholder="Autosizable"
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

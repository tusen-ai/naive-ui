# Size

```html
<n-space vertical>
  <n-input
    v-model:value="value"
    type="input"
    size="small"
    placeholder="Small Input"
  />
  <n-input v-model:value="value" type="input" placeholder="Medium Input" />
  <n-input
    v-model:value="value"
    type="input"
    size="large"
    placeholder="Large Input"
  />
</n-space>
```

```js
export default {
  data() {
    return {
      value: null
    }
  }
}
```

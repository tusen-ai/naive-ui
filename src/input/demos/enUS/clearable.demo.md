# Clearable

Make input clearable when value is set.

```html
<n-space vertical>
  <n-input
    v-model:value="value"
    type="input"
    placeholder="Content is clearable"
    clearable
  />
  <n-input
    v-model:value="value"
    type="password"
    placeholder="Content is clearable"
    clearable
  />
  <n-input
    v-model:value="value"
    type="textarea"
    placeholder="Content is clearable"
    round
    clearable
  />
  <n-button size="small" @click="value = 'Content is clearable'"
    >Fill Content</n-button
  >
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

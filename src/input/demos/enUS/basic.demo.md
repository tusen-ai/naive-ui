# Basic

Basic usage of input.

```html
<n-space vertical>
  <n-input v-model:value="value" type="text" placeholder="Basic Input" />
  <n-input v-model:value="value" type="textarea" placeholder="Basic Textarea" />
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

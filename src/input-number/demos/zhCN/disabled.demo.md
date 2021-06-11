# 禁用

```html
<n-space align="center">
  <n-switch v-model:value="disabled" />
  <n-input-number :disabled="disabled" v-model:value="value" />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(0),
      disabled: ref(true)
    }
  }
})
```

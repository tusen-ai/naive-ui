# 原生属性

想来它本应如此，这是它最初的样子

```html
<n-space vertical>
  <n-input
    :input-props="{type:'url'}"
    v-model:value="value"
    placeholder="URL"
  />
  <n-input
    :input-props="{type:'tel'}"
    v-model:value="value"
    placeholder="Tel"
  />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(null)
    }
  }
})
```

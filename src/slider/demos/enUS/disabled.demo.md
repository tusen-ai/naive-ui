# Disabled

```html
<n-space vertical>
  <n-slider disabled v-model:value="value" />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(50)
    }
  }
})
```

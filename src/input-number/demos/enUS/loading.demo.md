# Loading

```html
<n-space>
  <n-input-number clearable :loading="loading" />
  <n-switch v-model:value="loading" />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      loading: ref(false)
    }
  }
})
```

# Basic

```html
<n-space>
  <n-switch v-model:value="active" />
  <n-switch v-model:value="active" disabled />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      active: ref(false)
    }
  }
})
```

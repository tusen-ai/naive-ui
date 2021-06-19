# 间隔

```html
<n-input-number v-model:value="value" :step="2" />
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(0)
    }
  }
})
```

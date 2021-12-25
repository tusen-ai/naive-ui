# Loading

`input-number` also supports loading state.

```html
<n-input-number v-model:value="value" clearable loading />
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

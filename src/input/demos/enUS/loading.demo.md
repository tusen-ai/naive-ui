# Loading

`input` has a loading state.

```html
<n-input v-model:value="value" type="text" placeholder="Basic Input" loading />
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

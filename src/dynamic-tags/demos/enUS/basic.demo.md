# Basic

```html
<n-dynamic-tags v-model:value="tags" />
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      tags: ref(['teacher', 'programmer'])
    }
  }
})
```

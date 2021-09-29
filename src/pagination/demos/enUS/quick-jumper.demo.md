# Quick Jumper

```html
<n-pagination v-model:page="page" :page-count="100" show-quick-jumper />
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      page: ref(2)
    }
  }
})
```

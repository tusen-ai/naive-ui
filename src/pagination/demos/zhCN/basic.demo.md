# 基础用法

```html
<n-pagination v-model:page="page" :page-count="100" />
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

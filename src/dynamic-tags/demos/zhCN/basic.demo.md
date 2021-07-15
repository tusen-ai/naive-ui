# 基础用法

```html
<n-dynamic-tags v-model:value="tags" />
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      tags: ref(['教师', '程序员'])
    }
  }
})
```

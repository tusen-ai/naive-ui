# 最大标签数量

```html
<n-dynamic-tags v-model:value="tags" :max="3" />
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

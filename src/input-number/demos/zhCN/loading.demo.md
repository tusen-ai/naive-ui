# 加载状态

`input-number` 当然也可以有加载状态。

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

# 自定义验证

```html
<n-input-number v-model:value="value" :validator="validator" />
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(0),
      validator: (x) => x > 0
    }
  }
})
```

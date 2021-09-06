# 格式化

```html
<n-time-picker v-model:value="time" format="h:mm a" />
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      time: ref(null)
    }
  }
})
```

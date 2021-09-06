# 基础用法

```html
<n-space>
  <n-time-picker v-model:value="time0" />
  <n-time-picker v-model:value="time1" />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      time0: ref(null),
      time1: ref(1183135260000)
    }
  }
})
```

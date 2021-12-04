# 多于两个滑块

虽然我也不知道有啥用，但是这看起来很屌。

```html
<n-space vertical>
  <n-slider range v-model:value="value" :step="1" />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref([50, 70, 80, 90])
    }
  }
})
```

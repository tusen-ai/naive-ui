# 倒转

设定 `inverted` 可以将轨道倒转过来。

```html
<n-space vertical>
  <n-slider v-model:value="value" :step="10" inverted />
  <n-input-number size="small" v-model:value="value" />
</n-space>
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

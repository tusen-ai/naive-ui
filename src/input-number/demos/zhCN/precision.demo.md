# 精度

设置 `precision` 属性可以控制数值精度。

```html
<n-space vertical>
  <n-input-number
    v-model:value="value"
    :update-value-on-input="false"
    clearable
    :precision="2"
  />
  <n-input-number v-model:value="value" clearable :precision="2" />
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

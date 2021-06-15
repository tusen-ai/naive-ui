# 隐藏按钮

使用 `show-button` 属性来控制是否展示按钮。

```html
<n-space align="center">
  <n-switch v-model:value="disabled" />
  <n-input-number :show-button="disabled" v-model:value="value" />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(0),
      disabled: ref(true)
    }
  }
})
```

# 原生属性

`input` 有一些比较特殊的 DOM 属性，有时候你可能会想使用，比如 `auto-complete` 或者特殊的 type。你可以使用 `input-props` 设定。

```html
<n-space vertical>
  <n-input
    :input-props="{ type:'url' }"
    v-model:value="value"
    placeholder="URL"
  />
  <n-input
    :input-props="{ type:'tel' }"
    v-model:value="value"
    placeholder="Tel"
  />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(null)
    }
  }
})
```

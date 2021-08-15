# 部分选中

```html
<n-space item-style="display: flex;" align="center">
  <n-checkbox v-model:checked="value" :indeterminate="indeterminate"
    >复选框</n-checkbox
  >
  <n-checkbox v-model:checked="value" :indeterminate="indeterminate" />
  <n-checkbox v-model:checked="value" :indeterminate="indeterminate" disabled />
  <n-button @click="value = !value" size="small">选中</n-button>
  <n-button @click="indeterminate = !indeterminate" size="small"
    >部分选中</n-button
  >
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(false),
      indeterminate: ref(false)
    }
  }
})
```

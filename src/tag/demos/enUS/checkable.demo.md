# Checkable

It can be checkable.

```html
<n-space>
  <n-tag checkable disabled v-model:checked="checked"> Real Love </n-tag>
  <n-tag checkable v-model:checked="checked"> Yes It Is </n-tag>
  <n-tag checkable v-model:checked="checked"> I'm Down </n-tag>
  <n-tag checkable v-model:checked="checked"> Yesterday </n-tag>
  <n-tag checkable v-model:checked="checked"> I'm Looking Through You </n-tag>
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      checked: ref(false)
    }
  }
})
```

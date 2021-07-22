# 可选择

它可以变成可选择的。

```html
<n-space>
  <n-tag checkable disabled v-model:checked="checked"> 爱在西元前 </n-tag>
  <n-tag checkable v-model:checked="checked"> 不该 </n-tag>
  <n-tag checkable v-model:checked="checked"> 超人不会飞 </n-tag>
  <n-tag checkable v-model:checked="checked"> 手写的从前 </n-tag>
  <n-tag checkable v-model:checked="checked"> 哪里都是你 </n-tag>
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

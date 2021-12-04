# 改变值的时机

将 `update-value-on-input` 设为 `false`，则在输入的过程中不会改变值。

```html
<n-space vertical>
  <n-input-number
    :update-value-on-input="false"
    v-model:value="value"
    placeholder=""
    :min="20"
    :max="50"
  />
  <n-input-number v-model:value="value" placeholder="" :min="20" :max="50" />
  {{ value }}
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(35)
    }
  }
})
```

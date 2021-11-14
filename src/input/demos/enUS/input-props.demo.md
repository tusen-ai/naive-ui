# Input props

Input element has some special attributes, such as `auto-complete` or `type`. You can use `input-props` to set it.

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

# Basic

```html
<n-space vertical>
  <n-slider v-model:value="value" :step="10" />
  <n-input-number size="small" v-model:value="value" />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(50)
    }
  }
})
```

# Shape

Switch can have square shape.

```html
<n-space>
  <n-switch v-model:value="active" :round="false" />  
  <n-switch v-model:value="active" />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      active: ref(false)
    }
  }
})
```

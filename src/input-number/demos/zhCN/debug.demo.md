# Debug

```html
<n-input-number
  v-model:value="value1"
  placeholder="最小值"
  :min="-3"
  :max="5"
  @update:value="handleUpdateValue1"
  loading
/>
{{ JSON.stringify(value1) }}
<n-input-number v-model:value="value2" @update:value="handleUpdateValue2" />
{{ JSON.stringify(value2) }}
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      handleUpdateValue1 (v) {
        console.log(v)
      },
      handleUpdateValue2 (v) {
        console.log(v)
      },
      value1: ref(null),
      value2: ref(null)
    }
  }
})
```

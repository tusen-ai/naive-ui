# Format Tooltip

```html
<n-slider
  v-model:value="value"
  :step="10"
  :format-tooltip="value => `${value}%`"
/>
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

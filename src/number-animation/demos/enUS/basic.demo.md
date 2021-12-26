# Basic

```html
<n-number-animation
  title="User Grouth"
  :value="50.52"
  :precision="2"
  :value-from="0"
  v-model:start="start"
/>
<n-button @click="start=!start">Start</n-button>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      start: ref(false)
    }
  }
})
```

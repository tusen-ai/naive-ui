# Month Range

```html
<n-date-picker v-model:value="timestamp" type="monthrange" clearable />
<pre>{{ JSON.stringify(timestamp) }}</pre>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      timestamp: ref([1183135260000, Date.now()])
    }
  }
})
```

# Default Time

```html
<n-date-picker
  v-model:value="range"
  type="datetimerange"
  clearable
  :default-time="['13:22:11',16 * 60 * 60 * 1000]"
/>
<pre>{{ JSON.stringify(range) }}</pre>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      range: ref([1183135260000, Date.now()])
    }
  }
})
```

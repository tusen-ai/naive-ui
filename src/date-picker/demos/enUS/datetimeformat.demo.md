# Date time format

```html
<n-date-picker
  v-model:value="timestamp"
  value-format="yyyy-MM-dd HH:mm:ss"
  type="datetime"
  clearable
/>
<pre>{{ JSON.stringify(timestamp) }}</pre>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      timestamp: ref('2007-06-30 12:08:55')
    }
  }
})
```

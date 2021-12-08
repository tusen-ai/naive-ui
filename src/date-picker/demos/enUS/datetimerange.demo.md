# Date time range

```html
<n-date-picker v-model:value="range" type="datetimerange" clearable />
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

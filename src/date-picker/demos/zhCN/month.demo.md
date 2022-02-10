# 月份

```html
<n-date-picker v-model:value="timestamp" :defaultYearArray="defaultYearArray" type="month" clearable />
<pre>{{ JSON.stringify(timestamp) }}</pre>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      defaultYearArray: [2007, 2008, 2009, 2011],
      timestamp: ref(1183135260000)
    }
  }
})
```

# Customizing Ranges

```html
<n-space vertical>
  <n-date-picker type="daterange" clearable :ranges="ranges" />
  <n-date-picker type="datetimerange" clearable :ranges="ranges" />
</n-space>
```

```js
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    return {
      ranges: {
        'This Month': [startOfMonth, endOfMonth]
      }
    }
  }
})
```

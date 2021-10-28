# Size

The Time Picker can be a `small`, `medium` or `large` size.

```html
<n-space vertical>
  <n-time-picker v-model:value="timestamp" size="small" />
  <n-time-picker v-model:value="timestamp" size="medium" />
  <n-time-picker v-model:value="timestamp" size="large" />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      timestamp: ref(null)
    }
  }
})
```

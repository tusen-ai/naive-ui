# Reverse

Set `reverse` to invert the track.

```html
<n-space vertical>
  <n-slider v-model:value="value" :step="10" reverse />
  <n-input-number size="small" v-model:value="value" />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(0)
    }
  }
})
```

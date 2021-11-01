# Hide button

Use `show-button` prop to control whether to show control buttons.

```html
<n-space align="center">
  <n-switch v-model:value="disabled" />
  <n-input-number :show-button="disabled" v-model:value="value" />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(0),
      disabled: ref(true)
    }
  }
})
```

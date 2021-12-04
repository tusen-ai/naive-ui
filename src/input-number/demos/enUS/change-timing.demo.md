# Timing to change

Set `update-value-on-input` to `false`, the value won't be changed on input.

```html
<n-space vertical>
  <n-input-number
    :update-value-on-input="false"
    v-model:value="value"
    placeholder=""
    :min="20"
    :max="50"
  />
  <n-input-number v-model:value="value" placeholder="" :min="20" :max="50" />
  {{ value }}
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(35)
    }
  }
})
```

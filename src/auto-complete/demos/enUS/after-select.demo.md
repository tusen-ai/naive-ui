# Actions After Select

Blur after selection or clear after selection.

```html
<n-space vertical>
  <n-auto-complete
    :options="options"
    v-model:value="value"
    clear-after-select
    placeholder="Clear After Select"
  />
  <n-auto-complete
    :options="options"
    v-model:value="value"
    blur-after-select
    placeholder="Blur After Select"
  />
</n-space>
```

```js
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup () {
    const valueRef = ref('')
    return {
      value: valueRef,
      options: computed(() => {
        return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
          const value = valueRef.value === null ? '' : valueRef.value
          const prefix = value.split('@')[0]
          return {
            label: prefix + suffix,
            value: prefix + suffix
          }
        })
      })
    }
  }
})
```

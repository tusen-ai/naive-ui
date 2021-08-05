# Size

```html
<n-space vertical>
  <n-auto-complete
    :options="options"
    v-model:value="value"
    placeholder="Email"
    size="small"
  />
  <n-auto-complete
    :options="options"
    v-model:value="value"
    placeholder="Email"
    size="medium"
  />
  <n-auto-complete
    :options="options"
    v-model:value="value"
    placeholder="Email"
    size="large"
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
          const prefix = valueRef.value.split('@')[0]
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

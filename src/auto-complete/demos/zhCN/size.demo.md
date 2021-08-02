# 尺寸

```html
<n-space vertical>
  <n-auto-complete
    :options="options"
    v-model:value="value"
    placeholder="邮箱"
    size="small"
  />
  <n-auto-complete
    :options="options"
    v-model:value="value"
    placeholder="邮箱"
    size="medium"
  />
  <n-auto-complete
    :options="options"
    v-model:value="value"
    placeholder="邮箱"
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

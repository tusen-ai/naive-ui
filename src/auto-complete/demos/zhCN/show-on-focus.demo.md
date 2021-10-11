# 聚焦后显示所有选项

```html
<n-space vertical>
  <n-space><n-switch v-model:value="showOnFocus" />showOnFocus</n-space>
  <n-auto-complete
    :options="options"
    v-model:value="value"
    placeholder="邮箱"
    :show-on-focus="showOnFocus"
  />
</n-space>
```

```js
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup () {
    const valueRef = ref('')
    const showOnFocusRef = ref(true)
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
      }),
      showOnFocus: showOnFocusRef
    }
  }
})
```

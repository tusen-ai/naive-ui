# 是否显示所有选项

你可以根据输入的值来决定是否显示所有选项

```html
<n-auto-complete
  :options="options"
  v-model:value="value"
  placeholder="输入空或者非`a`显示所有选项"
  :get-derived-show-from-value="getDerivedShowFromValue"
/>
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
      showOnFocus: showOnFocusRef,
      getDerivedShowFromValue: (value) => {
        if (!value || value !== 'a') {
          return true
        }
        return false
      }
    }
  }
})
```

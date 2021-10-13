# Whether to show all options

Your can determine is whether to show all options based on value when it is focused.

```html
<n-auto-complete
  :options="options"
  v-model:value="value"
  placeholder="input empty or not `a` value to show all options"
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

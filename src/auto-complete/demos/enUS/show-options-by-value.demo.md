# Whether to show menu

Your can determine is whether to show menu based on value when it is focused.

```html
<n-auto-complete
  :options="options"
  v-model:value="value"
  placeholder="Input 'a' to show menu"
  :get-show="getShow"
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
      getShow: (value) => {
        if (value === 'a') {
          return true
        }
        return false
      }
    }
  }
})
```

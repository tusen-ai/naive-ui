# Add tooltip to option

Use the `render-option` property to control rendering of the entire option.

```html
<n-auto-complete
  :options="options"
  v-model:value="value"
  placeholder="Email"
  :render-option="renderOption"
/>
```

```js
import { defineComponent, h, ref, computed } from 'vue'
import { NTooltip } from 'naive-ui'

export default defineComponent({
  setup () {
    const valueRef = ref('')
    return {
      renderOption: ({ node, option }) =>
        h(NTooltip, null, {
          trigger: () => node,
          default: () => 'Rubber Soul -' + option.label
        }),
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

# 给选项增加 Tooltip

`render-option` 可以让你控制整个选项的渲染。

```html
<n-auto-complete :options="options" v-model:value="value" placeholder="邮箱" :render-option="renderOption" />
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

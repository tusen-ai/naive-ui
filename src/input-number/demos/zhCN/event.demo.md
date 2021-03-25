# 事件

```html
<n-input-number
  v-model:value="value"
  @update:value="handleChange"
  @focus="handleFocus"
  @blur="handleBlur"
/>
```

```js
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      value: ref(0),
      handleChange (v) {
        message.info(`update:value(${v})`)
      },
      handleBlur () {
        message.info('blur')
      },
      handleFocus () {
        message.info('focus')
      }
    }
  }
})
```

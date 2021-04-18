# 输入成对值

```html
<n-input
  pair
  separator="-"
  :placeholder="placeholder"
  clearable
  @blur="handleInputBlur"
  @focus="handleInputFocus"
  @change="handleInputChange"
  @update:value="handleInputInput"
/>
```

```js
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      placeholder: ['从', '到'],
      handleInputBlur () {
        message.info('输入成对值：Blur')
      },
      handleInputFocus () {
        message.info('输入成对值：Focus')
      },
      handleInputInput () {
        message.info('输入成对值：Input')
      },
      handleInputChange () {
        message.info('输入成对值：Change')
      }
    }
  }
})
```

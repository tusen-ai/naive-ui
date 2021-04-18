# 事件

```html
<n-space vertical>
  <n-input
    @blur="handleBlur"
    @focus="handleFocus"
    @change="handleChange"
    @keyup="handleKeyUp"
    @input="handleInput"
    placeholder="触发事件"
  />
  <n-input
    type="textarea"
    @blur="handleBlur"
    @focus="handleFocus"
    @change="handleChange"
    @keyup="handleKeyUp"
    @input="handleInput"
    placeholder="触发事件"
  />
</n-space>
```

```js
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleFocus (e) {
        message.info('[Event focus]')
      },
      handleBlur (e) {
        message.info('[Event blur]')
      },
      handleChange (v) {
        message.info('[Event change]: ' + v)
      },
      handleKeyUp (e) {
        message.info('[Event keyup]')
      },
      handleInput (v) {
        message.info('[Event input]: ' + v)
      }
    }
  }
})
```

# 事件

处理的事件。

```html
<n-rate :value='value' @update:value='handleUpdate' />
```

```js
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    const value = ref(2)
    return {
      value,
      handleUpdate (val) {
        message.info('rate is: ' + val)
      }
    }
  }
})
```

# 事件

处理按钮的事件。

```html
<n-button @click="handleClick">点它</n-button>
```

```js
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleClick () {
        message.info('Button Clicked')
      }
    }
  }
})
```

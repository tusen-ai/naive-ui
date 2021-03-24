# Events

Handle events on button.

```html
<n-button @click="handleClick">Click Me</n-button>
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

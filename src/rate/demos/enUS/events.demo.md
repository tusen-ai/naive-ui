# Events

Handle events。

```html
<n-rate :default-value="2" @update:value='handleUpdate' />
```

```js
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleUpdate (val) {
        message.info('rate is: ' + val)
      }
    }
  }
})
```

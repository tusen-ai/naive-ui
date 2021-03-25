# 事件

```html
<n-switch v-model:value="active" @update:value="handleChange" />
```

```js
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      active: ref(false),
      handleChange (value) {
        message.info(`Update value: ${value}`)
      }
    }
  }
})
```

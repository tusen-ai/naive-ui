# Closable

```html
<n-space>
  <n-tag closable @close="handleClose"> Real Love </n-tag>
  <n-tag type="success" closable @close="handleClose"> Yes It Is </n-tag>
  <n-tag type="warning" closable @close="handleClose"> I'm Down </n-tag>
  <n-tag type="error" closable @close="handleClose"> Yesterday </n-tag>
  <n-tag type="info" closable @close="handleClose">
    I'm Looking Through You
  </n-tag>
</n-space>
```

```js
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleClose () {
        message.info('tag close')
      }
    }
  }
})
```

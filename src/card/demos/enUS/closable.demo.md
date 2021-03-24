# Closable

You may need when use it in modal.

```html
<n-card title="Card" closable @close="handleClose">Card Content</n-card>
```

```js
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleClose () {
        message.info('Card Close')
      }
    }
  }
})
```

```css
.n-card {
  max-width: 300px;
}
```

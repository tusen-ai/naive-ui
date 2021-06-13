# Mask Closable

Use `mask-closable=false` to make modal not emit the event which may close the modal.

```html
<n-button @click="showModal = true"> Start Me up </n-button>
<n-modal
  v-model:show="showModal"
  :mask-closable="false"
  preset="dialog"
  title="Dialog"
  content="Are you sure?"
  positive-text="Confirm"
  @positive-click="onPositiveClick"
  @negative-click="onNegativeClick"
  negative-text="Cancel"
/>
```

```js
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

export default {
  setup () {
    const message = useMessage()
    const showModalRef = ref(false)
    return {
      showModal: showModalRef,
      onPositiveClick () {
        message.success('Cancel')
        showModalRef.value = false
      },
      onNegativeClick () {
        message.success('Submit')
        showModalRef.value = false
      }
    }
  }
}
```

# Click on mask

I think user is smart enough that they know if nothing happens after mask is clicked, they should click at confirm or cancel button.

```html
<n-button @click="handleButtonClick">Callback on Mask Clicked</n-button>
```

```js
import { defineComponent } from 'vue'
import { useMessage, useDialog } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    const dialog = useDialog()
    return {
      handleButtonClick () {
        dialog.success({
          title: 'Close',
          content: 'Are you sure?',
          positiveText: 'Sure',
          negativeText: 'Not Sure',
          maskClosable: false,
          onMaskClick: () => {
            message.success('cannot close')
          }
        })
      }
    }
  }
})
```

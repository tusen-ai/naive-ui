# Mask

Dialog mask.

```html
<n-space>
  <n-button @click="handleMask">mask</n-button>
  <n-button @click="handleClose">cannot close</n-button>
</n-space>
```

```js
import { useMessage, useDialog } from 'naive-ui'

export default {
  setup () {
    const message = useMessage()
    const dialog = useDialog()
    return {
      handleMask () {
        dialog.success({
          title: 'Close',
          content: 'Are you sure?',
          positiveText: 'Sure',
          negativeText: 'Not Sure',
          onMaskClick: (e) => {
            message.success('click mask')
          }
        })
      },
      handleClose () {
        dialog.success({
          title: 'Close',
          content: 'Are you sure?',
          positiveText: 'Sure',
          negativeText: 'Not Sure',
          maskClosable: false,
          onMaskClick: (e) => {
            message.success('cannot close')
          }
        })
      }
    }
  }
}
```

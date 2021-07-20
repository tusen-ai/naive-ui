# 蒙层

对话框有蒙层

```html
<n-space>
  <n-button @click="handleMask">蒙层</n-button>
  <n-button @click="handleClose">不可关闭</n-button>
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
          title: '关闭',
          content: '你确定？',
          positiveText: '确定',
          negativeText: '不确定',
          onMaskClick: (e) => {
            message.success('点击蒙层')
          }
        })
      },
      handleClose () {
        dialog.success({
          title: '关闭',
          content: '你确定？',
          positiveText: '确定',
          negativeText: '不确定',
          maskClosable: false,
          onMaskClick: (e) => {
            message.success('不能关闭')
          }
        })
      }
    }
  }
}
```

# 可拖拽

可拖拽移动弹框。

```html
<n-space>
  <n-button @click="handleConfirm"> 可拖拽 </n-button>
</n-space>
```

```js
import { defineComponent } from 'vue'
import { useMessage, useDialog } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    const dialog = useDialog()
    return {
      handleConfirm () {
        dialog.warning({
          title: '警告',
          content: '你确定？',
          positiveText: '确定',
          negativeText: '不确定',
          onPositiveClick: () => {
            message.success('确定')
          },
          onNegativeClick: () => {
            message.error('不确定')
          },
          draggable: true
        })
      }
    }
  }
})
```

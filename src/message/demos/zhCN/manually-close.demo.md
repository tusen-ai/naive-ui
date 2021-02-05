# 手动关闭

```html
<n-space>
  <n-button @click="createMessage"> 打开 </n-button>
  <n-button @click="removeMessage"> 关闭 </n-button>
</n-space>
```

```js
import { onBeforeUnmount } from 'vue'
import { useMessage } from 'naive-ui'

export default {
  setup () {
    const message = useMessage()
    let messageReactive = null

    function removeMessage () {
      if (messageReactive) {
        messageReactive.destroy()
        messageReactive = null
      }
    }

    onBeforeUnmount(removeMessage)
    return {
      removeMessage,
      createMessage () {
        if (!messageReactive) {
          messageReactive = message.info('3 * 3 * 4 * 4 * ?', {
            duration: 0
          })
        }
      }
    }
  }
}
```

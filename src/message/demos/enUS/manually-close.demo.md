# Manually close

```html
<n-space>
  <n-button @click="createMessage"> Create </n-button>
  <n-button @click="removeMessage"> Destroy </n-button>
</n-space>
```

```js
import { defineComponent, onBeforeUnmount, reactive } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    let messageReactive = reactive({})

    const removeMessage = () => {
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
})
```

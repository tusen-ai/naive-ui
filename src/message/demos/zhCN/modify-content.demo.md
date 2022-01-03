# 修改创建的信息

```html
<n-space>
  <n-button @click="createMessage"> 先开个信息 </n-button>
  <n-button @click="changeType">改变类型</n-button>
  <n-button @click="plus">加一</n-button>
</n-space>
```

```js
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    const types = ['success', 'info', 'warning', 'error', 'loading']
    const countRef = ref(0)
    const typeIndexRef = ref(0)
    let msgReactive = null

    return {
      plus () {
        if (msgReactive) {
          countRef.value++
          msgReactive.content = '' + countRef.value
        }
      },
      changeType () {
        if (msgReactive) {
          typeIndexRef.value = (typeIndexRef.value + 1) % types.length
          msgReactive.type = types[typeIndexRef.value]
        }
      },
      createMessage () {
        msgReactive = message[types[typeIndexRef.value]]('' + countRef.value, {
          duration: 10000
        })
      }
    }
  }
})
```

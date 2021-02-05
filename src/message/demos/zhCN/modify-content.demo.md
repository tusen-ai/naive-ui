# 修改创建的信息

```html
<n-space>
  <n-button @click="createMessage"> 先开个信息 </n-button>
  <n-button @click="changeType">改变类型</n-button>
  <n-button @click="plus">加一</n-button>
</n-space>
```

```js
import { useMessage } from 'naive-ui'

export default {
  setup () {
    const message = useMessage()
    let count = 0
    let typeIndex = 0
    const types = ['success', 'info', 'warning', 'error', 'loading']
    let msg = null
    return {
      plus () {
        if (msg) {
          count++
          msg.content = '' + count
        }
      },
      changeType () {
        if (msg) {
          typeIndex = (typeIndex + 1) % types.length
          msg.type = types[typeIndex]
        }
      },
      createMessage () {
        msg = message[types[typeIndex]]('' + count, { duration: 10000 })
      }
    }
  }
}
```

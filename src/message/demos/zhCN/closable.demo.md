# 可关闭

设定 `closable` 使 Message 可以通过点击关闭。

```html
<n-button @click="createMessage"> 打开信息 </n-button>
```

```js
import { useMessage } from 'naive-ui'

export default {
  setup () {
    const message = useMessage()
    return {
      createMessage () {
        message.info(
          "I don't know why nobody told you how to unfold your love",
          {
            closable: true,
            duration: 5000
          }
        )
      }
    }
  }
}
```

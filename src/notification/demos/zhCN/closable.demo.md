# 不可关闭

通知可以不能被关闭

```html
<n-button @click="handleClick"> 不能关闭 </n-button>
```

```js
import { useNotification } from 'naive-ui'

export default {
  setup () {
    const notification = useNotification()
    return {
      handleClick () {
        notification.create({
          title: 'Close Me if You Can',
          duration: 2000,
          closable: false,
          onAfterLeave: () => {
            notification.create({
              title: 'Ha Ha Ha Ha!',
              duration: 2000,
              closable: false,
              onAfterLeave: () => {
                notification.create({
                  title: "No, You Can't",
                  duration: 2000,
                  closable: false
                })
              }
            })
          }
        })
      }
    }
  }
}
```

# Unclosable

You can make it unclosable.

```html
<n-button @click="handleClick"> Unclosable </n-button>
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

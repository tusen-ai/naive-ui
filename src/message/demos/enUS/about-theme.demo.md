# Caveat About Theme

If you don't specified the theme, the theme of created message will be the same as its `n-message-provider`.

```html
<n-button @click="info">
  You can change the theme while the message is active
</n-button>
```

```js
import { useMessage } from 'naive-ui'

export default {
  setup () {
    const message = useMessage()
    return {
      info () {
        message.info(
          "I don't know why nobody told you how to unfold your love",
          { duration: 5000 }
        )
      }
    }
  }
}
```

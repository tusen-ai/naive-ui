# Type

```html
<n-space>
  <n-button @click="notify('info')"> Info </n-button>
  <n-button @click="notify('success')"> Success </n-button>
  <n-button @click="notify('warning')"> Warning </n-button>
  <n-button @click="notify('error')"> Error </n-button>
</n-space>
```

```js
import { useNotification } from 'naive-ui'

export default {
  setup () {
    const notification = useNotification()
    return {
      notify (type) {
        notification[type]({
          content: 'What to say?',
          meta: "I don't know"
        })
      }
    }
  }
}
```

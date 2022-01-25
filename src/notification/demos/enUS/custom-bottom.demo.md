# Customize the bottom position

```html
<n-notification-provider placement="bottom-right" bottom="55px">
  <notification-button />
</n-notification-provider>
```

```js
import { defineComponent, h } from 'vue'
import { useNotification, NButton } from 'naive-ui'

const NotificationButton = {
  setup () {
    const notification = useNotification()
    return {
      notification
    }
  },
  render () {
    return h(
      NButton,
      {
        onClick: () => {
          this.notification.info({
            title: 'Customize the bottom position',
            content: 'Maybe in a particular scenario, you might want to use it'
          })
        }
      },
      { default: () => 'Customize the bottom position' }
    )
  }
}

export default defineComponent({
  components: {
    NotificationButton
  }
})
```

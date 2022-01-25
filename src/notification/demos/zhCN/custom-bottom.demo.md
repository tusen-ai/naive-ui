# 自定义底部位置

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
            title: '自定义底部位置',
            content: '或许特定场景，可能会用到'
          })
        }
      },
      { default: () => '自定义底部位置' }
    )
  }
}

export default defineComponent({
  components: {
    NotificationButton
  }
})
```

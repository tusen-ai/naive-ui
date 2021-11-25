# Max

```html
<n-notification-provider :max="3">
   <Button />
</n-notification-provider>
```

```js
import { defineComponent, ref, h } from 'vue'
import { useNotification, NButton } from 'naive-ui'

const Button = {
  setup () {
    const notification = useNotification()
    const number = ref(0)
    return {
      notification,
      number
    }
  },
  render () {
    return h(
      NButton,
      {
        onClick: () => {
          this.number++
          this.notification.info({
            title: `Notification number: ${this.number}`,
            content: 'You can limit the number of notifications'
          })
        }
      },
      { default: 'Max notifications: 3' }
    )
  }
}

export default defineComponent({
  components: {
    Button
  }
})
```
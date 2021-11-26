# 限制数量

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
            title: `通知框序号: ${this.number}`,
            content: '你可以限制通知框的数量'
          })
        }
      },
      { default: '通知框的最大数: 3' }
    )
  }
}

export default defineComponent({
  components: {
    Button
  }
})
```

# 位置

```html
<n-notification-provider :placement="placement">
  <buttons />
</n-notification-provider>
```

```js
import { useNotification, NButton, NSpace } from 'naive-ui'
import { ref, defineComponent, h } from 'vue'

const placementRef = ref('top-right')
const Buttons = {
  setup () {
    const notification = useNotification()
    return {
      notification
    }
  },
  render () {
    const children = ['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(placement =>
      h(
        NButton,
        {
          onClick: () => {
            placementRef.value = placement
            this.notification.info({
              title: "Wouldn't it be Nice",
              description: 'From the Beach Boys',
              content: `I can be ${placement}`
            })
          }
        },
        { default: () => placement }
      )
    )
    return [
      h(
        NSpace,
        null,
        {
          default: () => children
        }
      )
    ]
  }
}

export default defineComponent({
  components: { Buttons },
  setup () {
    return {
      placement: placementRef
    }
  }
})
```

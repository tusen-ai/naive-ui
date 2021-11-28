# 弹出位置

```html
<n-notification-provider :placement="placement">
  <placement-buttons @placement-change="handlePlacementChange" />
</n-notification-provider>
```

```js
import { defineComponent, h, ref } from 'vue'
import { useNotification, NButton, NSpace } from 'naive-ui'

const PlacementButtons = {
  props: {
    onPlacementChange: Function
  },
  setup () {
    const notification = useNotification()
    const placementList = [
      { placement: 'top-left', text: '左上' },
      { placement: 'top-right', text: '右上' },
      { placement: 'bottom-left', text: '左下' },
      { placement: 'bottom-right', text: '右下' }
    ]
    return {
      notification,
      placementList
    }
  },
  render () {
    return h(NSpace, null, {
      default: () =>
        this.placementList.map((item) =>
          h(
            NButton,
            {
              onClick: () => {
                this.onPlacementChange(item.placement)
                this.notification.info({
                  title: item.placement,
                  content: 'You can change the placement'
                })
              }
            },
            { default: () => item.text }
          )
        )
    })
  }
}

export default defineComponent({
  components: {
    PlacementButtons
  },
  setup () {
    const placementRef = ref('top-right')
    return {
      placement: placementRef,
      handlePlacementChange (val) {
        placementRef.value = val
      }
    }
  }
})
```

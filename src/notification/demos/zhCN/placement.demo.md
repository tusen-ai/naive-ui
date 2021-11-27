# Placement

```html
<n-notification-provider :placement="placement">
  <Buttons @changePlacement="changePlacement" />
</n-notification-provider>
```

```js
import { defineComponent, h, ref } from 'vue'
import { useNotification, NButton } from 'naive-ui'

const Buttons = {
  emits: ['changePlacement'],
  setup () {
    const notification = useNotification()
    const placementArray = [
      { placement: 'top-left', text: '左上' },
      { placement: 'top-right', text: '右上' },
      { placement: 'bottom-left', text: '左下' },
      { placement: 'bottom-right', text: '右下' }
    ]
    return {
      notification,
      placementArray
    }
  },
  render () {
    return this.placementArray.map((item) =>
      h(
        NButton,
        {
          onClick: () => {
            this.$emit('changePlacement', item.placement)
            this.notification.info({
              title: item.placement,
              content: 'You can change the placement'
            })
          },
          style: {
            marginRight: '10px'
          }
        },
        { default: () => item.text }
      )
    )
  }
}

export default defineComponent({
  components: {
    Buttons
  },
  setup () {
    const placementRef = ref('top-right')
    return {
      placement: placementRef,
      changePlacement (val) {
        placementRef.value = val
      }
    }
  }
})
```

# Placement

```html
<n-notification-provider :placement="placement">
  <Buttons @change-placement="changePlacement" />
</n-notification-provider>
```

```js
import { useNotification, NButton, NSpace } from 'naive-ui'
import { ref, defineComponent, h } from 'vue'

const Buttons = {
  emits: ['changePlacement'],
  setup () {
    const notification = useNotification()
    return {
      notification
    }
  },
  render () {
    const children = ['top', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right'].map(placement =>
      h(
        NButton,
        {
          onClick: () => {
            this.$emit('changePlacement', placement)
            this.notification.info({
              title: "Wouldn't it be Nice",
              description: 'From the Beach Boys',
              content: `I can be ${placement}`
            })
          },
        },
        { default: () => placement }
      ),
    )
    return [
      h(
        NSpace,
        null,
        children
      )
    ]
  }
}

export default defineComponent({
  components: { Buttons },
  setup () {
    const placementRef = ref('top-right')
    return {
      placement: placementRef,
      changePlacement: (val) => {
        placementRef.value = val
      }
    }
  }
})
```

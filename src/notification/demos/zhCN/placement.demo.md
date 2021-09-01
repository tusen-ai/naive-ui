# Placement

```html
<n-notification-provider :placement="placement">
  <Buttons @change-placement="changePlacement" />
</n-notification-provider>
```

```js
import { useNotification, NButton } from 'naive-ui'
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
    return [
      h(
        NButton,
        {
          onClick: () => {
            this.$emit('changePlacement', 'top')
            this.notification.info({
              title: "Wouldn't it be Nice",
              description: 'From the Beach Boys',
              content: 'I can be top'
            })
          },
          style: {
            marginRight: '10px',
            marginTop: '10px'
          }
        },
        { default: () => '顶部' }
      ),
      h(
        NButton,
        {
          onClick: () => {
            this.$emit('changePlacement', 'bottom')
            this.notification.info({
              title: "Wouldn't it be Nice",
              description: 'From the Beach Boys',
              content: 'I can be bottom'
            })
          },
          style: {
            marginRight: '10px',
            marginTop: '10px'
          }
        },
        { default: () => '底部' }
      ),
      h(
        NButton,
        {
          onClick: () => {
            this.$emit('changePlacement', 'top-left')
            this.notification.info({
              title: "Wouldn't it be Nice",
              description: 'From the Beach Boys',
              content: 'I can be top left'
            })
          },
          style: {
            marginRight: '10px',
            marginTop: '10px'
          }
        },
        { default: () => '左上' }
      ),
      h(
        NButton,
        {
          onClick: () => {
            this.$emit('changePlacement', 'top-right')
            this.notification.info({
              title: "Wouldn't it be Nice",
              description: 'From the Beach Boys',
              content: 'I can be top right'
            })
          },
          style: {
            marginRight: '10px',
            marginTop: '10px'
          }
        },
        { default: () => '右上' }
      ),
      h(
        NButton,
        {
          onClick: () => {
            this.$emit('changePlacement', 'bottom-left')
            this.notification.info({
              title: "Wouldn't it be Nice",
              description: 'From the Beach Boys',
              content: 'I can be bottom left'
            })
          },
          style: {
            marginRight: '10px',
            marginTop: '10px'
          }
        },
        { default: () => '左下' }
      ),
      h(
        NButton,
        {
          onClick: () => {
            this.$emit('changePlacement', 'bottom-right')
            this.notification.info({
              title: "Wouldn't it be Nice",
              description: 'From the Beach Boys',
              content: 'I can be bottom right'
            })
          },
          style: {
            marginRight: '10px',
            marginTop: '10px'
          }
        },
        { default: () => '右下' }
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

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
        { default: () => 'Top' }
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
        { default: () => 'Bottom' }
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
        { default: () => 'Top Left' }
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
        { default: () => 'Top Right' }
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
        { default: () => 'Bottom Left' }
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
        { default: () => 'Bottom Right' }
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

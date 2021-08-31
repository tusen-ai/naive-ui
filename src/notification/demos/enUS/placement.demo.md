# Placement

```html
<n-notification-provider :placement="placement">
  <Buttons @changePlacement="changePlacement" />
</n-notification-provider>
```

```js
import { useNotification, NButton } from 'naive-ui'
import { h, ref, nextTick } from 'vue'

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
              content: 'This is Content'
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
          onClick: async () => {
            this.$emit('changePlacement', 'bottom')
            await nextTick()
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
        { default: () => 'TopLeft' }
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
        { default: () => 'TopRight' }
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
        { default: () => 'BottomLeft' }
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
        { default: () => 'BottomRight' }
      )
    ]
  }
}

export default {
  components: {
    Buttons
  },
  setup () {
    const placement = ref('top-right')
    return {
      placement,
      changePlacement: (val) => {
        placement.value = val
      }
    }
  }
}
```

# Placement

```html
<n-message-provider :placement="placement">
  <Buttons @changePlacement="changePlacement" />
</n-message-provider>
```

```js
import { useMessage, NButton } from 'naive-ui'
import { h, ref } from 'vue'

const Buttons = {
  emits: ['changePlacement'],
  setup () {
    const message = useMessage()
    const placementArray = [
      { placement: 'top', text: 'Top' },
      { placement: 'bottom', text: 'Bottom' },
      { placement: 'top-left', text: 'TopLeft' },
      { placement: 'top-right', text: 'TopRight' },
      { placement: 'bottom-left', text: 'BottomLeft' },
      { placement: 'bottom-right', text: 'BottomRight' }
    ]
    return {
      message,
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
            this.message.info('How many roads must a man walk down')
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

export default {
  components: {
    Buttons
  },
  setup () {
    const placement = ref('top')
    return {
      placement,
      changePlacement: (val) => {
        placement.value = val
      }
    }
  }
}
```

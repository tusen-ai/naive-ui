# Placement

```html
<n-message-provider :placement="placement">
  <Buttons @changePlacement="changePlacement" />
</n-message-provider>
```

```js
import { defineComponent, h, ref } from 'vue'
import { useMessage, NButton } from 'naive-ui'

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

export default defineComponent({
  components: {
    Buttons
  },
  setup () {
    const placementRef = ref('top')
    return {
      placement: placementRef,
      changePlacement (val) {
        placementRef.value = val
      }
    }
  }
})
```

# 位置

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
      { placement: 'top', text: '顶部' },
      { placement: 'bottom', text: '底部' },
      { placement: 'top-left', text: '左上' },
      { placement: 'top-right', text: '右上' },
      { placement: 'bottom-left', text: '左下' },
      { placement: 'bottom-right', text: '右下' }
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

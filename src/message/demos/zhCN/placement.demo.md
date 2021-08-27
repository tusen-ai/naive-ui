# 位置

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
    return {
      message
    }
  },
  render () {
    return [
      h(
        NButton,
        {
          onClick: () => {
            this.$emit('changePlacement', 'top')
            this.message.info('How many roads must a man walk down')
          },
          style: {
            marginRight: '10px'
          }
        },
        { default: () => '顶部' }
      ),
      h(
        NButton,
        {
          onClick: () => {
            this.$emit('changePlacement', 'bottom')
            this.message.info('How many roads must a man walk down')
          },
          style: {
            marginRight: '10px'
          }
        },
        { default: () => '底部' }
      ),
      h(
        NButton,
        {
          onClick: () => {
            this.$emit('changePlacement', 'top-left')
            this.message.info('How many roads must a man walk down')
          },
          style: {
            marginRight: '10px'
          }
        },
        { default: () => '左上' }
      ),
      h(
        NButton,
        {
          onClick: () => {
            this.$emit('changePlacement', 'top-right')
            this.message.info('How many roads must a man walk down')
          },
          style: {
            marginRight: '10px'
          }
        },
        { default: () => '右上' }
      ),
      h(
        NButton,
        {
          onClick: () => {
            this.$emit('changePlacement', 'bottom-left')
            this.message.info('How many roads must a man walk down')
          },
          style: {
            marginRight: '10px'
          }
        },
        { default: () => '左下' }
      ),
      h(
        NButton,
        {
          onClick: () => {
            this.$emit('changePlacement', 'bottom-right')
            this.message.info('How many roads must a man walk down')
          },
          style: {
            marginRight: '10px'
          }
        },
        { default: () => '右下' }
      )
    ]
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

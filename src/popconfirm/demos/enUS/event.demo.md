# Event

`positive-click` & `negative-click`

```html
<n-popconfirm
  @positive-click="handlePositiveClick"
  @negative-click="handleNegativeClick"
>
  <template #activator>
    <n-button>Quit Game</n-button>
  </template>
  I heared that players will still be abused after purchasing in some games when
  I watch Bilibili.
</n-popconfirm>
```

```js
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handlePositiveClick () {
        message.info('positive click')
      },
      handleNegativeClick () {
        message.info('negative click')
      }
    }
  }
})
```

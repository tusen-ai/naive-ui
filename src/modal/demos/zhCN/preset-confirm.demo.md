# 使用 Dialog 预设

`dialog` 预设的例子。

```html
<n-button @click="showModal = true"> 来吧 </n-button>
<n-modal
  v-model:show="showModal"
  preset="confirm"
  title="确认"
  content="你确认?"
  positive-text="确认"
  @positive-click="submitCallback"
  @negative-click="cancelCallback"
  negative-text="算了"
/>
```

```js
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

export default {
  setup () {
    const message = useMessage()
    return {
      showModal: ref(false),
      cancelCallback () {
        message.success('Cancel')
      },
      submitCallback () {
        message.success('Submit')
      }
    }
  }
}
```

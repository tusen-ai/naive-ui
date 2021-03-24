# 可关闭

用于 Modal 的时候，你可能需要这个属性。

```html
<n-card title="卡片" closable @close="handleClose">卡片内容</n-card>
```

```js
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleClose () {
        message.info('Card Close')
      }
    }
  }
})
```

```css
.n-card {
  max-width: 300px;
}
```

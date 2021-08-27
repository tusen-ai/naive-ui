# 自定义 Action

有的时候你想自定义 `action` 和 `content`。

```html
<n-space>
  <n-button @click="handleButtonClick">使用渲染函数</n-button>
</n-space>
```

```js
import { defineComponent } from 'vue'
import { useDialog, NTag } from 'naive-ui'

export default defineComponent({
  components: {
    NTag
  },
  setup () {
    const dialog = useDialog()
    return {
      handleButtonClick () {
        dialog.warning({
          title: '使用渲染函数',
          content: () => 'Content',
          action: () => 'Action'
        })
      }
    }
  }
})
```

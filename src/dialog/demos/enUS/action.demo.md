# Customize action

Sometimes you may want to customize `action` and `content` .

```html
<n-space>
  <n-button @click="handleConfirm">Use Render Function</n-button>
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
      handleConfirm () {
        dialog.warning({
          title: 'Use Render Function',
          content: () => 'Content',
          action: () => 'Action'
        })
      }
    }
  }
})
```

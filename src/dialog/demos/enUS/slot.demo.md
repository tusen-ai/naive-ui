# Custom action

Sometimes you may want to customize `action` and `content` .

```html
<n-space>
  <n-button @click="handleConfirm"> Warning </n-button>
</n-space>
```

```js
import { useMessage, useDialog, NTag } from 'naive-ui'
import { h } from 'vue'

export default {
  components: {
    NTag
  },
  setup () {
    const message = useMessage()
    const dialog = useDialog()
    return {
      handleConfirm () {
        const instance = dialog.warning({
          title: 'Warning',
          content: () => h(NTag, ['Are you sure?']),
          action: () =>
            h('div', [
              h(
                NTag,
                {
                  onClick: () => {
                    message.success('Confirmed!')
                  }
                },
                ['Yes!']
              ),
              h(
                NTag,
                {
                  onClick: () => {
                    message.error('Not sure yet!')
                    instance.destroy()
                  },
                  style: {
                    marginLeft: '20px'
                  }
                },
                ['No!']
              )
            ])
        })
      }
    }
  }
}
```

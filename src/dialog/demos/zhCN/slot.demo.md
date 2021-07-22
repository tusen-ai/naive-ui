# 自定义 action

有时候你可能想自定义 `action` 和 `content` 。

```html
<n-space>
  <n-button @click="handleConfirm"> 警告 </n-button>
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
          title: '警告',
          content: () => h(NTag, ['你确定?']),
          action: () =>
            h('div', [
              h(
                NTag,
                {
                  onClick: () => {
                    message.success('确定了！')
                  }
                },
                ['确定！']
              ),
              h(
                NTag,
                {
                  onClick: () => {
                    message.error('没确定！')
                    instance.destroy()
                  },
                  style: {
                    marginLeft: '20px'
                  }
                },
                ['不确定！']
              )
            ])
        })
      }
    }
  }
}
```

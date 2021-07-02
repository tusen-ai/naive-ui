# 自定义标签渲染

给标签一点颜色看看。

```html
<n-select
  v-model:value="value"
  multiple
  :render-tag="renderTag"
  :options="options"
/>
```

```js
import { defineComponent, ref, h } from 'vue'
import { NTag } from 'naive-ui'

export default defineComponent({
  setup () {
    return {
      value: ref([]),
      options: [
        {
          label: '今天在摸鱼',
          value: 'value1',
          type: 'success'
        },
        {
          label: '工作没做完',
          value: 'value2',
          type: 'warning'
        },
        {
          label: '晚上要加班',
          value: 'value3',
          type: 'error'
        }
      ],
      renderTag: ({ option, handleClose }) => {
        return h(
          NTag,
          {
            type: option.type,
            closable: true,
            onClose: (e) => {
              e.stopPropagation()
              handleClose()
            }
          },
          { default: () => option.label }
        )
      }
    }
  }
})
```

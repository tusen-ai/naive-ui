# 自定义标签渲染

给标签一点颜色看看。

```html
<n-select
  v-model:value="value"
  multiple
  :render-tag="renderTag"
  :render-label="renderLabel"
  :options="options"
/>
```

```js
import { defineComponent, ref, h } from 'vue'
import { NTag, NImage } from 'naive-ui'

export default defineComponent({
  setup () {
    return {
      value: ref([]),
      renderLabel: (option) => {
        return [
          h(NImage, {
            width: 40,
            height: 50,
            src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
          }),
          option.label
        ]
      },
      options: [
        {
          label: '工作没做完',
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

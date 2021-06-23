# 自定义标签渲染

给标签一点颜色看看

```html
<n-space vertical>
  <n-select
    v-model:value="value"
    multiple
    :render-tag="renderTag"
    :options="options"
  />
</n-space>
```

```js
import { h } from 'vue'
import { NTag } from 'naive-ui'

export default {
  data () {
    return {
      value: [],
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
      renderTag: ({ option, onClose }) => {
        return h(
          NTag,
          {
            type: option.type,
            closable: true,
            onClose: onClose
          },
          { default: () => option.label }
        )
      }
    }
  }
}
```

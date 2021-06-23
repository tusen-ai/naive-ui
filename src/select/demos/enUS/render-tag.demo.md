# Custom Tag Render

Give the tag a little color

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
          label: 'Daze today',
          value: 'value1',
          type: 'success'
        },
        {
          label: 'Work is not finished',
          value: 'value2',
          type: 'warning'
        },
        {
          label: 'Work overtime in the evening',
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

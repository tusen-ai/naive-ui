# Custom tag rendering

Give the tag a little color.

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

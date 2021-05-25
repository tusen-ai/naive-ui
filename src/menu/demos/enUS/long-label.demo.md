# Long Label

Set `label` to render function that renders `n-ellpisis`.

```html
<n-menu :options="options" style="width: 180px;" default-value="1" />
```

```js
import { defineComponent, h } from 'vue'
import { NEllipsis } from 'naive-ui'

export default defineComponent({
  setup () {
    return {
      options: [
        {
          label: () =>
            h(NEllipsis, null, {
              default: () =>
                'The lights are extinguished. Matter is transformed and the heavens have shifted. Clay figures vanish into the sea.'
            }),
          key: '1'
        },
        {
          label: () =>
            h(NEllipsis, null, {
              default: () =>
                'The darkness is like a boulder pressing down upon the breast.'
            }),
          key: '2'
        }
      ]
    }
  }
})
```

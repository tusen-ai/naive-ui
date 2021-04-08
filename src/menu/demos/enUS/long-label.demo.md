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
            h(NEllipsis, null, { default: () => '电灯熄灭 物换星移 泥牛入海' }),
          key: '1'
        },
        {
          label: () =>
            h(NEllipsis, null, { default: () => '黑暗好像 一颗巨石 按在胸口' }),
          key: '2'
        }
      ]
    }
  }
})
```

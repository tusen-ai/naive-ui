# Render Label

The `renderLabel` can be used to batch render dropdown options.

```html
<n-dropdown
  :options="options"
  placement="bottom-start"
  trigger="click"
  @select="handleSelect"
  :render-label="renderDropdownLabel"
>
  <n-button>Anyway.FM</n-button>
</n-dropdown>
```

```js
import { h, defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

const options = [
  {
    label: 'Anyway.FM',
    key: 'Anyway.FM',
    href: 'https://anyway.fm/'
  },
  {
    label: 'Anyway.News',
    key: 'Anyway.News',
    href: 'https://anyway.fm/news/'
  }
]

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      options,
      renderDropdownLabel (option) {
        return h(
          'a',
          {
            href: option.href,
            target: '_blank'
          },
          {
            default: () => option.label
          }
        )
      },
      handleSelect (key) {
        message.info(key)
      }
    }
  }
})
```

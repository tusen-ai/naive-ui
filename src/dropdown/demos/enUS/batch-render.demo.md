# Batch Render

The `render-label` and `render-icon` properties can be used to pre-process dropdown options.

**Note: the `render-label` will take effect for group type labels, which can be set through `option.type`.**

```html
<n-dropdown
  :options="options"
  placement="bottom-start"
  trigger="click"
  @select="handleSelect"
  :render-label="renderDropdownLabel"
  :render-icon="renderDropdownIcon"
>
  <n-button>Batch Render</n-button>
</n-dropdown>
```

```js
import { h, defineComponent } from 'vue'
import { NIcon } from 'naive-ui'
import { CashOutline as CashIcon } from '@vicons/ionicons5'

const options = [
  {
    type: 'group',
    label: 'People and Some Food to Eat',
    key: 'main',
    children: [
      {
        label: 'Jay Gatsby',
        key: 'jay gatsby'
      },
      {
        label: 'Daisy Buchanan',
        key: 'daisy buchanan'
      },
      {
        label: 'Nick Carraway',
        key: 'nick carraway'
      },
      {
        label: 'food',
        key: 'food',
        children: [
          {
            label: 'chicken',
            key: 'chicken'
          },
          {
            label: 'beef',
            key: 'beef'
          }
        ]
      }
    ]
  }
]

export default defineComponent({
  setup () {
    return {
      options,
      renderDropdownLabel (option) {
        if (option.type === 'group') {
          return option.label
        }
        return h(
          'a',
          {
            href: '',
            target: '_blank'
          },
          {
            default: () => option.label
          }
        )
      },
      renderDropdownIcon (option) {
        return h(NIcon, null, {
          default: () => h(CashIcon)
        })
      }
    }
  }
})
```

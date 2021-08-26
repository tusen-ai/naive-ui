# Size

A dropdown has different sizes.

```html
<n-space vertical>
  <n-dropdown
    placement="bottom-start"
    trigger="click"
    size="small"
    @select="handleSelect"
    :options="options"
  >
    <n-button>Small Size</n-button>
  </n-dropdown>
  <n-dropdown
    placement="bottom-start"
    trigger="click"
    size="medium"
    @select="handleSelect"
    :options="options"
  >
    <n-button>Medium Size</n-button>
  </n-dropdown>
  <n-dropdown
    placement="bottom-start"
    trigger="click"
    size="large"
    @select="handleSelect"
    :options="options"
  >
    <n-button>Large Size</n-button>
  </n-dropdown>
  <n-dropdown
    placement="bottom-start"
    trigger="click"
    size="huge"
    @select="handleSelect"
    :options="options"
  >
    <n-button>Huge Size</n-button>
  </n-dropdown>
</n-space>
```

```js
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

const options = [
  {
    label: 'Jay Gatsby',
    key: 'jay gatsby'
  },
  {
    label: 'Daisy Buchanan',
    key: 'daisy buchanan'
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: 'Nick Carraway',
    key: 'nick carraway'
  },
  {
    label: 'Others',
    key: 'others1',
    children: [
      {
        label: 'Jordan Baker',
        key: 'jordan baker'
      },
      {
        label: 'Tom Buchanan',
        key: 'tom buchanan'
      },
      {
        label: 'Others',
        key: 'others2',
        children: [
          {
            label: 'Chicken',
            key: 'chicken'
          },
          {
            label: 'Beef',
            key: 'beef'
          }
        ]
      }
    ]
  }
]

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      options,
      handleSelect (key) {
        message.info(key)
      }
    }
  }
})
```

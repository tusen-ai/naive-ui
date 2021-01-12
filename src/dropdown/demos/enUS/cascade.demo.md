# Cascade

Dropdown can be cascade.

```html
<n-dropdown
  :options="options"
  placement="bottom-start"
  trigger="click"
  @select="handleSelect"
>
  <n-button :keyboard="false">People and Some Food to Eat</n-button>
</n-dropdown>
```

```js
import { h, resolveComponent } from 'vue'
import { CashOutline as CashIcon } from '@vicons/ionicons-v5'

const options = [
  {
    label: 'Jay Gatsby',
    key: 'jay gatsby'
  },
  {
    label: 'Daisy Buchanan',
    icon () {
      return h(resolveComponent('n-icon'), null, {
        default: () => h(CashIcon)
      })
    },
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

export default {
  inject: ['message'],
  data () {
    return {
      options
    }
  },
  methods: {
    handleSelect (name) {
      this.message.info(name)
    }
  }
}
```

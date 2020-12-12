# 多级

下拉菜单可以是多级的。

```html
<n-dropdown
  :options="options"
  placement="bottom-start"
  trigger="click"
  @select="handleSelect"
>
  <n-button :keyboard="false">人物和食物</n-button>
</n-dropdown>
```

```js
import { h, resolveComponent } from 'vue'
import { CashOutline as CashIcon } from '@vicons/ionicons-v5'

const options = [
  {
    label: '杰·盖茨比',
    key: 'jay gatsby'
  },
  {
    label: '黛西·布坎南',
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
    label: '尼克·卡拉威',
    key: 'nick carraway'
  },
  {
    label: '其他',
    key: 'others1',
    children: [
      {
        label: '乔丹·贝克',
        key: 'jordan baker'
      },
      {
        label: '汤姆·布坎南',
        key: 'tom buchanan'
      },
      {
        label: '其他',
        key: 'others2',
        children: [
          {
            label: '鸡肉',
            key: 'chicken'
          },
          {
            label: '牛肉',
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
    handleSelect (key) {
      this.message.info(key)
    }
  }
}
```

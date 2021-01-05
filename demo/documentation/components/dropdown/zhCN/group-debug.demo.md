# 成组

弄个选项组。

```html
<n-dropdown
  :options="options"
  placement="bottom-start"
  trigger="click"
  @select="handleSelect"
>
  <n-button :keyboard="false">里面有组</n-button>
</n-dropdown>
```

```js
import { h, resolveComponent } from 'vue'
import { CashOutline as CashIcon } from '@vicons/ionicons-v5'

const options = [
  {
    type: 'group',
    label: '主角和吃的',
    key: 'main',
    children: [
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
        label: '尼克·卡拉威',
        key: 'nick carraway'
      },
      {
        label: '吃的',
        key: 'food',
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
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: '其他角色',
    key: 'others1',
    children: [
      {
        label: '乔丹·贝克',
        key: 'jordan baker'
      },
      {
        label: '汤姆·布坎南',
        key: 'tom buchanan'
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

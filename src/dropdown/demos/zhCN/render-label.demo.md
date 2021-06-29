# 批量处理菜单渲染

使用 `renderLabel` 可以批量控制下拉菜单的选项渲染。

```html
<n-dropdown
  :options="options"
  placement="bottom-start"
  trigger="click"
  @select="handleSelect"
  :render-label="renderDropdownLabel"
>
  <n-button :keyboard="false">人物和食物</n-button>
</n-dropdown>
```

```js
import { h, defineComponent } from 'vue'
import { NIcon, useMessage } from 'naive-ui'
import { CashOutline as CashIcon } from '@vicons/ionicons5'

const options = [
  {
    label: '杰·盖茨比',
    key: 'jay gatsby'
  },
  {
    label: '黛西·布坎南',
    icon () {
      return h(NIcon, null, {
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
        disabled: true,
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

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      options,
      renderDropdownLabel (option) {
        return h('span', {}, { default: () => option.label })
      },
      handleSelect (key) {
        message.info(key)
      }
    }
  }
})
```

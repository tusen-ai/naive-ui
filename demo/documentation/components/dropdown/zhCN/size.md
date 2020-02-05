# 尺寸
```html
<n-dropdown
  placement="bottom-start"
  trigger="click"
  size="small"
  @select="handleSelect"
  :options="options"
  :focusable="false"
>
  <n-button>小号</n-button>
</n-dropdown>
<n-dropdown
  placement="bottom-start"
  trigger="click"
  size="medium"
  @select="handleSelect"
  :focusable="false"
  :options="options"
>
  <n-button>中号</n-button>
</n-dropdown>
<n-dropdown
  placement="bottom-start"
  trigger="click"
  size="large"
  :focusable="false"
  @select="handleSelect"
  :options="options"
>
  <n-button>大号</n-button>
</n-dropdown>
<n-dropdown
  placement="bottom-start"
  trigger="click"
  size="large"
  :focusable="false"
  @select="handleSelect"
  :options="options"
>
  <n-button>巨大号</n-button>
</n-dropdown>
```
```js
const options = [
  {
    label: '杰·盖茨比',
    key: 'jay gatsby'
  },
  {
    label: '黛西·布坎南',
    key: 'daisy buchanan'
  },
  {
    type: 'divider'
  },
  {
    label: '尼克·卡拉威',
    key: 'nick carraway'
  },
  {
    type: 'submenu',
    label: '其他',
    key: 'others',
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
        type: 'submenu',
        label: '其他',
        key: 'others',
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
  data () {
    return {
      options
    }
  },
  methods: {
    handleSelect (name) {
      this.$NMessage.info(name)
    }
  }
}
```
```css
.n-button {
  margin: 0 8px 12px 0;
}
```

# 宽度
可以设置 `width`、`max-width`、`min-width`、`submenu-width`、`submenu-max-width`、`sub-min-width`。
```html
<n-dropdown
  :options="options"
  placement="bottom-start"
  trigger="click"
  :width="180"
  :submenu-width="180"
  :default-focus="false"
  @select="handleSelect"
>
  <n-button>人物和食物</n-button>
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
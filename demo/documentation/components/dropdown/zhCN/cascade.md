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
const options = [
  {
    label: '杰·盖茨比',
    value: 'jay gatsby'
  },
  {
    label: '黛西·布坎南',
    value: 'daisy buchanan'
  },
  {
    type: 'divider'
  },
  {
    label: '尼克·卡拉威',
    value: 'nick carraway'
  },
  {
    label: '其他',
    value: 'others',
    children: [
      {
        label: '乔丹·贝克',
        value: 'jordan baker'
      },
      {
        label: '汤姆·布坎南',
        value: 'tom buchanan'
      },
      {
        label: '其他',
        value: 'others',
        children: [
          {
            label: '鸡肉',
            value: 'chicken'
          },
          {
            label: '牛肉',
            value: 'beef'
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
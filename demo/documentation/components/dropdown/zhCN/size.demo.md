# 尺寸
```html
<n-dropdown
  placement="bottom-start"
  trigger="click"
  size="small"
  @select="handleSelect"
  :options="options"
>
  <n-button :keyboard="false">小号</n-button>
</n-dropdown>
<n-dropdown
  placement="bottom-start"
  trigger="click"
  size="medium"
  @select="handleSelect"
  :options="options"
>
  <n-button :keyboard="false">中号</n-button>
</n-dropdown>
<n-dropdown
  placement="bottom-start"
  trigger="click"
  size="large"
  @select="handleSelect"
  :options="options"
>
  <n-button :keyboard="false">大号</n-button>
</n-dropdown>
<n-dropdown
  placement="bottom-start"
  trigger="click"
  size="large"
  @select="handleSelect"
  :options="options"
>
  <n-button :keyboard="false">巨大号</n-button>
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
```css
.n-button {
  margin: 0 8px 12px 0;
}
```

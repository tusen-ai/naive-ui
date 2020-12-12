# 尺寸

```html
<n-space>
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
</n-space>
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
  data() {
    return {
      options
    }
  },
  methods: {
    handleSelect(name) {
      this.message.info(name)
    }
  }
}
```

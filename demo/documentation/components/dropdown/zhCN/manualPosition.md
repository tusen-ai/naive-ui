# 手动定位
在特殊情况下，你可能想手动定位下拉菜单。比如在一块区域右击以弹出下拉菜单。
```html
<div style="width: 200px; height: 200px; background-color: rgba(0, 128, 0, .5);" @contextmenu="handleContextMenu">
  右击
</div>
<n-dropdown
  placement="bottom-start"
  trigger="manual"
  manually-positioned
  @select="handleSelect"
  @blur="handleBlur"
  :x="x"
  :y="y"
  :options="options"
  :show="showDropdown"
/>
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
  methods: {
    handleSelect (name) {
      this.showDropdown = false
      this.$NMessage.info(name)
    },
    handleBlur () {
      this.showDropdown = false
    },
    handleContextMenu (e) {
      e.preventDefault()
      this.showDropdown = false
      this.$nextTick().then(() => {
        this.showDropdown = true
        this.x = e.clientX
        this.y = e.clientY
      })
    }
  },
  data () {
    return {
      options,
      showDropdown: false,
      x: 0,
      y: 0
    }
  }
}
```
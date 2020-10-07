# 手动定位
在特殊情况下，你可能想手动定位下拉菜单。比如在一块区域右击以弹出下拉菜单。
```html
<div
  style="width: 200px; height: 200px; background-color: rgba(0, 128, 0, .5);" @contextmenu="handleContextMenu"
>
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
  methods: {
    handleSelect (name) {
      this.showDropdown = false
      this.message.info(name)
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
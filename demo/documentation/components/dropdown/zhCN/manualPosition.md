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
  v-model="showDropdown"
>
  <n-dropdown-item name="jay gatsby">
    杰·盖茨比
  </n-dropdown-item>
  <n-dropdown-item name="daisy buchanan">
    黛西·布坎南
  </n-dropdown-item>
  <n-dropdown-divider />
  <n-dropdown-item name="nick carraway">
    尼克·卡拉威
  </n-dropdown-item>
  <n-dropdown-submenu>
    <template v-slot:activator>
      其他
    </template>
    <n-dropdown-item name="jordan baker">
      乔丹·贝克
    </n-dropdown-item>
    <n-dropdown-divider />
    <n-dropdown-item name="tom buchanan">
      汤姆·布坎南
    </n-dropdown-item>
    <n-dropdown-submenu>
      <template v-slot:activator>
        其他
      </template>
      <n-dropdown-item name="chicken">
        鸡肉
      </n-dropdown-item>
      <n-dropdown-item name="beef">
        牛肉
      </n-dropdown-item>
    </n-dropdown-submenu>
  </n-dropdown-submenu>
</n-dropdown>
```
```js
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
      showDropdown: false,
      x: 0,
      y: 0
    }
  }
}
```

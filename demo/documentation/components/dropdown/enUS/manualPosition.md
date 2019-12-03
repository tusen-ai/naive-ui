# Manually Positioned
```html
<div style="width: 200px; height: 200px; background-color: rgba(0, 128, 0, .5);" @contextmenu="handleContextMenu"></div>
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
  <n-dropdown-item name="gatsby">
    Gatsby
  </n-dropdown-item>
  <n-dropdown-item name="daisy">
    Daisy
  </n-dropdown-item>
  <n-dropdown-divider />
  <n-dropdown-item name="nick">
    Nick
  </n-dropdown-item>
  <n-dropdown-submenu>
    <template v-slot:activator>
      Others
    </template>
    <n-dropdown-item name="jordan baker">
      Jordan Baker
    </n-dropdown-item>
    <n-dropdown-divider />
    <n-dropdown-item name="tom buchanan">
      Tom Buchanan
    </n-dropdown-item>
    <n-dropdown-submenu>
      <template v-slot:activator>
        Others
      </template>
      <n-dropdown-item name="chicken">
        Chicken
      </n-dropdown-item>
      <n-dropdown-item name="beef">
        Beef
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
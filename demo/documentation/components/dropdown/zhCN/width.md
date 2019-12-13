# 宽度
可以设置 `width`、`max-width`、`min-width`、`submenu-width`、`submenu-max-width`、`sub-min-width`。
```html
<n-dropdown
  placement="bottom-start"
  trigger="click"
  :width="180"
  :submenu-width="180"
  @select="handleSelect"
>
  <template v-slot:activator>
    <n-button>人物和食物</n-button>
  </template>
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
      this.$NMessage.info(name)
    }
  }
}
```

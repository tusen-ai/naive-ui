# Width
`width`, `max-width`, `min-width`, `submenu-width`, `submenu-max-width`, `sub-min-width` can be set.
```html
<n-dropdown
  placement="bottom-start"
  trigger="click"
  :width="180"
  :submenu-width="180"
  @select="handleSelect"
>
  <template v-slot:activator>
    <n-button>People and Some Food to Eat</n-button>
  </template>
  <n-dropdown-item name="jay gatsby">
    Jay Gatsby
  </n-dropdown-item>
  <n-dropdown-item name="daisy buchanan">
    Daisy Buchanan
  </n-dropdown-item>
  <n-dropdown-divider />
  <n-dropdown-item name="nick carraway">
    Nick Carraway
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
      this.$NMessage.info(name)
    }
  }
}
```
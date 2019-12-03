# Size
```html
<n-dropdown
  placement="bottom-start"
  trigger="click"
  size="small"
  @select="handleSelect"
  :focusable="false"
>
  <template v-slot:activator>
    <n-button>Small Some</n-button>
  </template>
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
<n-dropdown
  placement="bottom-start"
  trigger="click"
  size="medium"
  @select="handleSelect"
  :focusable="false"
>
  <template v-slot:activator>
    <n-button>Medium Some</n-button>
  </template>
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
<n-dropdown
  placement="bottom-start"
  trigger="click"
  size="large"
  :focusable="false"
  @select="handleSelect"
>
  <template v-slot:activator>
    <n-button>Large Some</n-button>
  </template>
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
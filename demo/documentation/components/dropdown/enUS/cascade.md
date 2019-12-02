# Cascade
```html
<n-dropdown
  placement="bottom-start"
  trigger="click"
>
  <template v-slot:activator>
    <n-button>People and something to eat</n-button>
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
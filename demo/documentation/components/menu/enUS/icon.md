# Icon
```html
<n-menu>
  <n-menu-item title="num1" name="num1">
    <template v-slot:icon>
      <n-icon>
        <ios-airplane />
      </n-icon>
    </template>
  </n-menu-item>
  <n-menu-item title="num2" name="num2">
    <template v-slot:icon>
      <n-icon>
        <ios-airplane />
      </n-icon>
    </template>
  </n-menu-item>
  <n-menu-item title="num3" name="num3">
    <template v-slot:icon>
      <n-icon>
        <ios-airplane />
      </n-icon>
    </template>
  </n-menu-item>
  <n-submenu title="subMenu" name="subMenu">
    <template v-slot:icon>
      <n-icon>
        <ios-airplane />
      </n-icon>
    </template>
    <n-menu-item title="sub1" name="sub1"></n-menu-item>
  </n-submenu>
  <n-submenu title="subMenu2" name="subMenu2">
  <template v-slot:icon>
      <n-icon>
        <ios-airplane />
      </n-icon>
    </template>
    <n-submenu title="subMenu22" name="subMenu22">
      <n-menu-item title="sub222" name="sub222"></n-menu-item>
    </n-submenu>
  </n-submenu>
  <n-submenu title="subMenu3" name="subMenu3">
    <template v-slot:icon>
      <n-icon>
        <ios-airplane />
      </n-icon>
    </template>
    <n-submenu title="group" name="group">
      <n-menu-item title="sub1" name="sub6"></n-menu-item>
      <n-menu-item title="sub1" name="sub7"></n-menu-item>
    </n-submenu>
  </n-submenu>
</n-menu>
```
```js
import iosAirplane from 'naive-ui/lib/icons/ios-airplane'

export default {
  components: {
    iosAirplane
  }
}
```
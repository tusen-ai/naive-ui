# Collapse Sider
Use `collapsed` prop to control status of sider.

Sider has two `collapse-mode`: `width`, `transform`. `width` will actually change width of sider, `transform` will just move sider out of layout.

Use `collapsed-width` and `width` to set sider's width.
```html
<n-switch v-model="collapsed" />
<n-layout>
  <n-layout-header style="height: 64px;">
    Cool Header
  </n-layout-header>
  <n-layout>
    <n-layout-sider
      collapse-mode="width"
      :collapsed-width="80"
      :width="240"
      :collapsed="collapsed"
      show-toggle-button
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <n-menu :collapsed="collapsed" :collapsed-width="80" v-model="activeMenuItemName">
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
        <n-sub-menu title="subMenu" name="subMenu">
          <template v-slot:icon>
            <n-icon>
              <ios-airplane />
            </n-icon>
          </template>
          <n-menu-item title="sub1" name="sub1"></n-menu-item>
        </n-sub-menu>
        <n-sub-menu title="subMenu2" name="subMenu2">
        <template v-slot:icon>
            <n-icon>
              <ios-airplane />
            </n-icon>
          </template>
          <n-sub-menu title="subMenu22" name="subMenu22">
            <n-menu-item title="sub222" name="sub222"></n-menu-item>
          </n-sub-menu>
        </n-sub-menu>
        <n-sub-menu title="subMenu3" name="subMenu3">
          <template v-slot:icon>
            <n-icon>
              <ios-airplane />
            </n-icon>
          </template>
          <n-sub-menu title="group" name="subMenu4">
            <n-menu-item title="sub1" name="sub6"></n-menu-item>
            <n-menu-item title="sub1" name="sub7"></n-menu-item>
          </n-sub-menu>
        </n-sub-menu>
      </n-menu>
    </n-layout-sider>
    <n-layout>
      <n-layout-content>
        <span>Content</span>
      </n-layout-content>
      <n-layout-footer>
        <n-h1>Footer</n-h1>
      </n-layout-footer>
    </n-layout>
  </n-layout>
</n-layout>
<n-layout style="height: 240px;">
  <n-layout-header mode="absolute" style="height: 64px;">
    Cool Header
  </n-layout-header>
  <n-layout mode="absolute" style="top: 64px;">
    <n-layout-sider
      mode="absolute"
      collapse-mode="transform"
      :collapsed-width="120"
      :width="240"
      :collapsed="collapsed"
      show-toggle-button
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <n-h1>Sider</n-h1>
    </n-layout-sider>
    <n-layout 
      mode="absolute"
    >
      <span>Content</span>
    </n-layout>
  </n-layout>
</n-layout>
```

```js
import iosAirplane from 'naive-ui/lib/icons/ios-airplane'

export default {
  components: {
    iosAirplane
  },
  data () {
    return {
      activeMenuItemName: null,
      collapsed: true
    }
  }
}
```